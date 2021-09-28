require('dotenv').config();

const express = require('express');
const next = require('next');
const { invalidateCachedPage, wipePageCache } = require('./incremental-cache');
const { initHeartbeat } = require('./revalidator-proxy-heartbeat.js');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();
const port = 3000;

const serviceSecret = process.env.SERVICE_SECRET;

app.prepare().then(() => {
    const server = express();

    app.server.incrementalCache.incrementalOptions.pagesDir =
        process.env.PAGE_CACHE_DIR;

    server.all('*', (req, res) => {
        const { secret } = req.headers;
        const { invalidate, wipeAll } = req.query;

        if (invalidate && secret === serviceSecret) {
            invalidateCachedPage(req.path, app);
            return res.status(200).send(`Invalidating cache for ${req.path}`);
        }

        if (wipeAll && secret === serviceSecret) {
            wipePageCache(app);
            return res.status(200).send('Wiping page cache');
        }

        return handle(req, res);
    });

    server.listen(port, (error) => {
        if (error) {
            throw error;
        }
        if (!serviceSecret) {
            throw new Error('Authentication key is not defined!');
        }

        console.log(`Server started on port ${port}`);
        initHeartbeat();
    });
});
