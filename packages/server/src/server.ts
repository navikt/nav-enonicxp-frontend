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

// Enhanced global error handlers
process.on('unhandledRejection', (reason, promise) => {
    console.error(`[UNHANDLED REJECTION] Promise: ${promise}`);
    console.error(`[UNHANDLED REJECTION] Reason: ${reason}`);
    console.error(`[UNHANDLED REJECTION] Type of reason: ${typeof reason}`);
    console.error(`[UNHANDLED REJECTION] Reason toString: ${String(reason)}`);

    if (reason instanceof Error) {
        console.error(`[UNHANDLED REJECTION] Error name: ${reason.name}`);
        console.error(`[UNHANDLED REJECTION] Error message: ${reason.message}`);
        console.error(`[UNHANDLED REJECTION] Stack: ${reason.stack}`);

        // Check if it's the path-to-regexp error
        if (
            reason.message?.includes('pathToRegexpError') ||
            reason.message?.includes('Missing parameter name')
        ) {
            console.error(`[UNHANDLED REJECTION] *** THIS IS THE PATH-TO-REGEXP ERROR! ***`);
            console.error(
                `[UNHANDLED REJECTION] Error details: ${JSON.stringify(reason, Object.getOwnPropertyNames(reason))}`
            );
        }
    }

    // Also log with logger
    logger.error(`[UNHANDLED REJECTION] ${String(reason)}`);

    // Don't exit the process, just log
    console.error('[UNHANDLED REJECTION] Continuing execution...');
});

process.on('uncaughtException', (error) => {
    console.error(`[UNCAUGHT EXCEPTION] ${error.message}`);
    console.error(`[UNCAUGHT EXCEPTION] Stack: ${error.stack}`);
    logger.error(`[UNCAUGHT EXCEPTION] ${error.message}`);
    logger.error(`[UNCAUGHT EXCEPTION] Stack: ${error.stack}`);
});

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

    // Add comprehensive request logging BEFORE any other middleware
    expressApp.use((req, res, next) => {
        const startTime = Date.now();
        logger.info(
            `[REQUEST] ${req.method} ${req.url} - Headers: ${JSON.stringify({
                'user-agent': req.headers['user-agent'],
                host: req.headers.host,
                'x-forwarded-for': req.headers['x-forwarded-for'],
            })}`
        );

        res.on('finish', () => {
            const duration = Date.now() - startTime;
            logger.info(`[RESPONSE] ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
        });

        next();
    });

    // expressApp.use(promMiddleware);

    expressApp.use((req, res, next) => {
        Object.defineProperty(req, 'query', {
            ...Object.getOwnPropertyDescriptor(req, 'query'),
            value: req.query,
            writable: true,
        });
        next();
    });

    if (isFailover) {
        console.log('[SERVER] Setting up failover routes...');
        try {
            serverSetupFailover(expressApp, nextApp);
            console.log('[SERVER] Failover routes setup completed');
        } catch (error) {
            console.error('[SERVER] Error setting up failover routes:', error);
            throw error;
        }
    } else {
        console.log('[SERVER] Setting up normal routes...');
        try {
            await serverSetup(expressApp, nextApp);
            console.log('[SERVER] Normal routes setup completed');
        } catch (error) {
            console.error('[SERVER] Error setting up normal routes:', error);
            throw error;
        }
    }

    const errorHandler: ErrorRequestHandler = (err, req, res, _) => {
        const { path, url, method } = req;
        const { status, stack, message } = err;
        const msg = stack?.split('\n')[0];

        // Enhanced logging for path-to-regexp errors
        if (message?.includes('pathToRegexpError') || message?.includes('Missing parameter name')) {
            logger.error(`[PATH-TO-REGEXP ERROR] ${method} ${url} - Path: ${path}`);
            logger.error(`[PATH-TO-REGEXP ERROR] Full message: ${message}`);
            logger.error(`[PATH-TO-REGEXP ERROR] Stack trace: ${stack}`);
            logger.error(`[PATH-TO-REGEXP ERROR] Request headers: ${JSON.stringify(req.headers)}`);
            logger.error(`[PATH-TO-REGEXP ERROR] Query params: ${JSON.stringify(req.query)}`);
            logger.error(`[PATH-TO-REGEXP ERROR] Body: ${JSON.stringify(req.body)}`);
        }

        logger.error(`[EXPRESS ERROR] ${method} ${url} - Status: ${status} - Message: ${msg}`);

        res.status(status || 500).json({ error: 'Internal server error' });
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
