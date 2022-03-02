require('dotenv').config();

const express = require('express');
const next = require('next');
const { setJsonCacheHeaders } = require('./set-json-cache-headers');
const {
    invalidateCachedPage,
    wipePageCache,
    handleInvalidateReq,
    handleInvalidateAllReq,
} = require('./incremental-cache');
const { initHeartbeat } = require('./revalidator-proxy-heartbeat.js');

const nextApp = next({
    dev: process.env.NODE_ENV !== 'production',
    quiet: process.env.ENV === 'prod',
});
const nextRequestHandler = nextApp.getRequestHandler();
const port = 3000;

const jsonBodyParser = express.json();

const verifySecret = (req, res, next) => {
    if (req.headers.secret !== process.env.SERVICE_SECRET) {
        res.status(404);
        console.warn(`Invalid secret for ${req.path}`);
        return nextApp.renderError(null, req, res, req.path);
    }

    next();
};

nextApp.prepare().then(() => {
    const server = express();

    const { SERVICE_SECRET, PAGE_CACHE_DIR } = process.env;

    if (PAGE_CACHE_DIR) {
        nextApp.server.incrementalCache.incrementalOptions.pagesDir =
            PAGE_CACHE_DIR;
    }

    server.post(
        '/invalidate',
        verifySecret,
        jsonBodyParser,
        handleInvalidateReq(nextApp)
    );

    server.get(
        '/invalidate/wipe-all',
        verifySecret,
        handleInvalidateAllReq(nextApp)
    );

    server.all('*', (req, res) => {
        const { secret } = req.headers;
        const { invalidate, wipeAll } = req.query;

        // TODO: remove these when no longer in use
        if (invalidate && secret === SERVICE_SECRET) {
            invalidateCachedPage(decodeURI(req.path), nextApp);
            return res.status(200).send(`Invalidating cache for ${req.path}`);
        }
        if (wipeAll && secret === SERVICE_SECRET) {
            wipePageCache(nextApp);
            return res.status(200).send('Wiping page cache');
        }

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
