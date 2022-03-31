require('dotenv').config();

const express = require('express');
const next = require('next');
const fetch = require('node-fetch');

const nextApp = next({
    dev: process.env.NODE_ENV !== 'production',
    quiet: process.env.ENV === 'prod',
});
const nextRequestHandler = nextApp.getRequestHandler();
const port = process.env.PORT || 3003;

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

    const { SERVICE_SECRET, IMAGE_CACHE_DIR } = process.env;

    if (IMAGE_CACHE_DIR) {
        nextApp.server.imageResponseCache.incrementalCache.cacheDir =
            IMAGE_CACHE_DIR;
    }

    server.get('/_next', (req, res) => {
        return nextRequestHandler(req, res);
    });

    server.all('*', verifySecret, (req, res) => {
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
            fetch(`${process.env.FAILOVER_ORIGIN}/api/internal/isReady`);
        }

        console.log(`Server started on port ${port}`);
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
