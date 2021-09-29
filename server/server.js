require('dotenv').config();

const express = require('express');
const next = require('next');
const { setJsonCacheHeaders } = require('./set-json-cache-headers');
const { invalidateCachedPage, wipePageCache } = require('./incremental-cache');
const { initHeartbeat } = require('./revalidator-proxy-heartbeat.js');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();
const port = 3000;

app.prepare().then(() => {
    const server = express();

    const { SERVICE_SECRET, PAGE_CACHE_DIR } = process.env;

    if (PAGE_CACHE_DIR) {
        app.server.incrementalCache.incrementalOptions.pagesDir =
            PAGE_CACHE_DIR;
    }

    server.all('*', (req, res) => {
        const { secret } = req.headers;
        const { invalidate, wipeAll } = req.query;

        if (invalidate && secret === SERVICE_SECRET) {
            invalidateCachedPage(req.path, app);
            return res.status(200).send(`Invalidating cache for ${req.path}`);
        }

        if (wipeAll && secret === SERVICE_SECRET) {
            wipePageCache(app);
            return res.status(200).send('Wiping page cache');
        }

        setJsonCacheHeaders(req, res);

        return handle(req, res);
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
