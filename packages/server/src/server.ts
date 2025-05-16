import express, { ErrorRequestHandler } from 'express';
import createNextApp from 'next';
import { createHttpTerminator } from 'http-terminator';
import promBundle from 'express-prom-bundle';
import path from 'path';
import { logger } from '@/shared/logger';
import { initRevalidatorProxyHeartbeat } from 'cache/revalidator-proxy-heartbeat';
import { serverSetupFailover } from 'server-setup/server-setup-failover';
import { serverSetup } from 'server-setup/server-setup';
import { getNextServer } from 'next-utils';
import { injectNextImageCacheDir } from 'cache/image-cache-handler';

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

    const nextServer = await getNextServer(nextApp);
    const test = nextServer as any;

    if (process.env.IMAGE_CACHE_DIR) {
        // await injectNextImageCacheDir(nextServer, process.env.IMAGE_CACHE_DIR);
    } else {
        logger.error('IMAGE_CACHE_DIR is not defined!');
    }

    const isFailover = process.env.IS_FAILOVER_INSTANCE === 'true';

    expressApp.use('*', promMiddleware);

    if (isFailover) {
        serverSetupFailover(expressApp, nextApp);
    } else {
        await serverSetup(expressApp, nextApp);
    }

    const errorHandler: ErrorRequestHandler = (err, req, res, _) => {
        const { path } = req;
        const { status, stack } = err;
        const msg = stack?.split('\n')[0];

        logger.error(`Express error on path ${path}: ${status} ${msg}`);

        res.status(status || 500);

        return nextServer.renderError(msg, req, res, path);
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

        logger.info(`Server started on port ${port}`);
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
