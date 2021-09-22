require('dotenv').config();

const express = require('express');
const next = require('next');
const { initHeartbeat } = require('./revalidator-proxy-heartbeat.js');
const { invalidateCache } = require('./invalidate-cache');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();
const port = 3000;

const serviceSecret = process.env.SERVICE_SECRET;

app.prepare().then(() => {
    const server = express();

    server.all('*', (req, res) => {
        const { secret, invalidate } = req.headers;
        if (invalidate && secret === serviceSecret) {
            invalidateCache(req.path, app);
            return res.status(200).send(`Invalidating cache for ${req.path}`);
        }

        return handle(req, res);
    });

    server.listen(port, (error) => {
        if (error) {
            throw error;
        }
        if (!serviceSecret) {
            throw new Error('Could not retrieve authentication token');
        }

        console.log(`Server started on port ${port}`);
        initHeartbeat();
    });
});
