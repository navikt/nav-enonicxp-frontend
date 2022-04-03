require('dotenv').config();

const express = require('express');
const expressPromBundle = require('express-prom-bundle');
const next = require('next');
const fetch = require('node-fetch');

const { setJsonCacheHeaders } = require('./set-json-cache-headers');
const {
    handleInvalidateReq,
    handleInvalidateAllReq,
    setCacheKey,
} = require('./incremental-cache');
const { initHeartbeat } = require('./revalidator-proxy-heartbeat');
const { validateSecret } = require('./validate-secret');

const nextApp = next({
    dev: process.env.NODE_ENV !== 'production',
    quiet: process.env.ENV === 'prod',
});

nextApp.prepare().then(() => {
    const server = express();
    const port = process.env.PORT || 3000;

    const jsonBodyParser = express.json();
    const prometheusMiddleware = expressPromBundle({
        includePath: true,
        metricsPath: '/internal/metrics',
    });

    const nextRequestHandler = nextApp.getRequestHandler();

    const {
        SERVICE_SECRET,
        PAGE_CACHE_DIR,
        IMAGE_CACHE_DIR,
        APP_ORIGIN,
        FAILOVER_ORIGIN,
        IS_FAILOVER_INSTANCE,
    } = process.env;

    if (PAGE_CACHE_DIR) {
        nextApp.server.incrementalCache.incrementalOptions.pagesDir =
            PAGE_CACHE_DIR;
    }

    if (IMAGE_CACHE_DIR) {
        nextApp.server.imageResponseCache.incrementalCache.cacheDir =
            IMAGE_CACHE_DIR;
    }

    server.post(
        '/invalidate',
        validateSecret,
        jsonBodyParser,
        setCacheKey,
        handleInvalidateReq(nextApp)
    );

    server.get(
        '/invalidate/wipe-all',
        validateSecret,
        setCacheKey,
        handleInvalidateAllReq(nextApp)
    );

    server.all('*', prometheusMiddleware, (req, res) => {
        setJsonCacheHeaders(req, res);

        return nextRequestHandler(req, res);
    });

    // Handle errors
    server.use((err, req, res, next) => {
        const { path } = req;
        const { status, stack } = err;
        const msg = stack?.split('\n')[0];

        console.log(`Express error on path ${path}: ${status} ${msg}`);

        res.status(status || 500);
        return nextApp.renderError(msg, req, res, path);
    });

    const serverInstance = server.listen(port, (error) => {
        if (error) {
            throw error;
        }
        if (!SERVICE_SECRET) {
            throw new Error('Authentication key is not defined!');
        }

        // Ensure the isReady-api is called when running locally
        if (process.env.ENV === 'localhost') {
            fetch(`http://localhost:${port}/api/internal/isReady`);
        }

        console.log(`Server started on port ${port}`);
        initHeartbeat();
    });

    const shutdown = () => {
        console.log('Server shutting down');

        serverInstance.close(() => {
            console.log('Shutdown complete!');
            process.exit(0);
        });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
});
