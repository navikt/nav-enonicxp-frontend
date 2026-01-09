import express, { ErrorRequestHandler } from 'express';
import createNextApp from 'next';
import { createHttpTerminator } from 'http-terminator';
import promBundle from 'express-prom-bundle';
import path from 'path';
import { logger } from '@/shared/logger';
import { initRevalidatorProxyHeartbeat } from 'cache/revalidator-proxy-heartbeat';
import { serverSetupFailover } from 'server-setup/server-setup-failover';
import { serverSetup } from 'server-setup/server-setup';

export type InferredNextWrapperServer = ReturnType<typeof createNextApp>;

const promMiddleware = promBundle({
    metricsPath: '/internal/metrics',
    customLabels: { hpa: 'rate' },
    includePath: false,
    promClient: {
        collectDefaultMetrics: {},
    },
});

const nextApp = createNextApp({
    dev: process.env.NODE_ENV === 'development' && process.env.ENV === 'localhost',
    quiet: process.env.ENV === 'prod',
    dir: path.join(__dirname, '..', '..', 'nextjs'),
});

nextApp.prepare().then(async () => {
    const expressApp = express();
    const port = process.env.PORT || 3000;

    const isFailover = process.env.IS_FAILOVER_INSTANCE === 'true';

    // Express 5 compatibility: Make request properties writable for Next.js
    expressApp.use((req, res, next) => {
        // Make query writable
        const query = req.query;
        Object.defineProperty(req, 'query', {
            get() {
                return query;
            },
            set(value) {
                Object.assign(query, value);
            },
            enumerable: true,
            configurable: true,
        });
        next();
    });

    expressApp.use(promMiddleware);

    if (isFailover) {
        serverSetupFailover(expressApp, nextApp);
    } else {
        await serverSetup(expressApp, nextApp);
    }

    const errorHandler: ErrorRequestHandler = (err, req, res, _) => {
        const { path } = req;
        const { status, stack } = err;
        const msg = stack?.split('\n')[0];

        logger.error('Express error', {
            error: err,
            metaData: { path, status, msg },
        });

        res.status(status || 500);
    };

    expressApp.use(errorHandler);

    const expressServer = expressApp.listen(port, () => {
        if (!process.env.SERVICE_SECRET) {
            throw new Error('Authentication key is not defined!');
        }

        // Ensure the isReady-api is called when running locally
        if (process.env.ENV === 'localhost') {
            fetch(`http://localhost:${port}/api/internal/isReady`);
        }

        if (!isFailover) {
            initRevalidatorProxyHeartbeat();
        }

        logger.info('Server started', { metaData: { port } });
    });

    const httpTerminator = createHttpTerminator({ server: expressServer });

    const shutdown = () => {
        logger.info('Server shutting down');
        httpTerminator.terminate().then(() => {
            expressServer.close(() => {
                logger.info('Shutdown complete!');
                process.exit(0);
            });
        });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
});
