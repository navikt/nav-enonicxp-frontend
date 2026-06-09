import express, { ErrorRequestHandler } from 'express';
import createNextApp from 'next';
import { createHttpTerminator } from 'http-terminator';
import promBundle from 'express-prom-bundle';
import path from 'path';
import { logger } from '@/shared/logger';
import { initRevalidatorProxyHeartbeat } from 'cache/revalidator-proxy-heartbeat';
import { serverSetupFailover } from 'server-setup/server-setup-failover';
import { serverSetup } from 'server-setup/server-setup';
import { buildPathValidationMiddleware } from 'req-handlers/path-validation-middleware';
import { getHealthMonitor, initHealthMonitor } from 'health/health-monitor';
import { initFatalProcessErrorHandling } from 'health/process-error-handler';

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

    // Check path for attack patterns and redirect to XP if valid request to backend
    expressApp.use(buildPathValidationMiddleware(nextApp));

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

    const errorHandler: ErrorRequestHandler = (error, req, res, _) => {
        const { path } = req;
        const { status, stack, message } = error;
        const msg = stack?.split('\n')[0];

        // Handle URIErrors from malformed URL encoding (likely fuzzy testing)
        if (error instanceof URIError || message?.includes('Failed to decode param')) {
            logger.warn('Malformed URL encoding detected', {
                error,
                metaData: { path, status: 400, msg },
            });
            // Add 15 second delay to deter bulk fuzz testing attempts
            res.status(400);
            setTimeout(() => {
                res.send('Bad Request');
            }, 15000);
            return;
        }

        logger.error('Express error', {
            error,
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

        // Initialize and start health probing now that the server is listening
        initHealthMonitor(typeof port === 'string' ? parseInt(port, 10) : port);

        logger.info('Server started', { metaData: { port } });
    });

    // --------------------------------
    // Graceful shutdown handling below
    // --------------------------------

    const httpTerminator = createHttpTerminator({ server: expressServer });

    let isShuttingDown = false;

    const shutdown = (exitCode: number, reason: string) => {
        if (isShuttingDown) {
            return;
        }

        isShuttingDown = true;
        logger.info('Server shutting down', { metaData: { reason, exitCode } });
        getHealthMonitor()?.stop();
        const forcedExitTimer = setTimeout(() => {
            logger.warn('Forced exit after shutdown timeout', { metaData: { reason } });
            process.exit(1);
        }, 10000);
        forcedExitTimer.unref();

        httpTerminator
            .terminate()
            .then(() => {
                expressServer.close(() => {
                    clearTimeout(forcedExitTimer);
                    logger.info('Graceful shutdown complete!');
                    process.exit(exitCode);
                });
            })
            .catch((error) => {
                clearTimeout(forcedExitTimer);
                logger.error('Graceful shutdown failed', { error, metaData: { reason } });
                process.exit(1);
            });
    };

    // Handles uncaughtException in the process and routes it through graceful shutdown.
    initFatalProcessErrorHandling(({ type }) => {
        shutdown(1, type);
    });

    process.on('SIGTERM', () => {
        shutdown(0, 'SIGTERM');
    });

    process.on('SIGINT', () => {
        shutdown(0, 'SIGINT');
    });
});
