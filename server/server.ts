import dotenv from 'dotenv';
dotenv.config();

import express, { ErrorRequestHandler } from 'express';
import next from 'next';
import fetch from 'node-fetch';
import { createHttpTerminator } from 'http-terminator';
import promBundle from 'express-prom-bundle';
import { initRevalidatorProxyHeartbeat } from './revalidator-proxy-heartbeat';
import { serverSetupFailover } from './server-setup-failover';
import { serverSetup } from './server-setup';
import { getNextServer } from './next-utils';

const promMiddleware = promBundle({
    includePath: true,
    metricsPath: '/internal/metrics',
    customLabels: { hpa: 'rate' },
    promClient: {
        collectDefaultMetrics: {},
    },
});

const nextApp = next({
    dev: process.env.NODE_ENV !== 'production',
    quiet: process.env.ENV === 'prod',
});

nextApp.prepare().then(() => {
    const expressApp = express();
    const port = process.env.PORT || 3000;

    const nextServer = getNextServer(nextApp);

    const isFailover = process.env.IS_FAILOVER_INSTANCE === 'true';

    expressApp.use('*', promMiddleware);

    expressApp.use('/*.(svg|png|ico|webmanifest)', (req, res, next) => {
        res.setHeader('Cache-Control', 'public,max-age=86400');
        next();
    });

    if (isFailover) {
        serverSetupFailover(expressApp, nextApp);
    } else {
        serverSetup(expressApp, nextApp);
    }

    const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
        const { path } = req;
        const { status, stack } = err;
        const msg = stack?.split('\n')[0];

        console.log(`Express error on path ${path}: ${status} ${msg}`);

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

        console.log(`Server started on port ${port}`);
    });

    const httpTerminator = createHttpTerminator({ server: expressServer });

    const shutdown = () => {
        console.log('Server shutting down');
        httpTerminator.terminate().then(() => {
            expressServer.close(() => {
                console.log('Shutdown complete!');
                process.exit(0);
            });
        });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
});
