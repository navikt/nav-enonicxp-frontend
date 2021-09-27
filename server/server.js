require('dotenv').config();

const express = require('express');
const next = require('next');
const { invalidateCachedPage, wipePageCache } = require('./incremental-cache');
const { initHeartbeat } = require('./revalidator-proxy-heartbeat.js');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();
const port = 3000;

const serviceSecret = process.env.SERVICE_SECRET;
const pageCacheBaseDirNais = '/tmp/pages';

app.prepare().then(() => {
    const server = express();
    if (process.env.ENV !== 'localhost') {
        app.server.incrementalCache.incrementalOptions.pagesDir =
            pageCacheBaseDirNais;
    }

    server.all('*', (req, res) => {
        const { secret, invalidate, wipeCache } = req.headers;

        if (invalidate && secret === serviceSecret) {
            invalidateCachedPage(req.path, app);
            return res.status(200).send(`Invalidating cache for ${req.path}`);
        }

        if (wipeCache && secret === serviceSecret) {
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
