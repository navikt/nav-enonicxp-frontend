require('dotenv').config();

const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const { setJsonCacheHeaders } = require('./set-json-cache-headers');
const {
    invalidateCachedPage,
    wipePageCache,
    handleInvalidateReq,
} = require('./incremental-cache');
const { initHeartbeat } = require('./revalidator-proxy-heartbeat.js');

const nextApp = next({
    dev: process.env.NODE_ENV !== 'production',
    quiet: process.env.ENV === 'prod',
});
const nextRequestHandler = nextApp.getRequestHandler();
const port = 3000;

const jsonBodyParser = bodyParser.json();

nextApp.prepare().then(() => {
    const server = express();

    const { SERVICE_SECRET, PAGE_CACHE_DIR } = process.env;

    if (PAGE_CACHE_DIR) {
        nextApp.server.incrementalCache.incrementalOptions.pagesDir =
            PAGE_CACHE_DIR;
    }

    server.post('/invalidate', jsonBodyParser, (req, res) => {
        const { secret, eventid } = req.headers;

        if (secret !== SERVICE_SECRET) {
            res.status(404);
            console.warn(`Invalid secret for invalidation event ${eventid}`);
            return nextApp.renderError(null, req, res, '/invalidate');
        }

        return handleInvalidateReq(req, res, nextApp, eventid);
    });

    server.all('*', (req, res) => {
        const { secret } = req.headers;
        const { invalidate, wipeAll } = req.query;

        // TODO: remove this when revalidator-proxy is updated to use the /invalidate post endpoint
        if (invalidate && secret === SERVICE_SECRET) {
            invalidateCachedPage(req.path, nextApp);
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

        res.status(status);
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
