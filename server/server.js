require('dotenv').config();

const express = require('express');
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



    const nextRequestHandler = nextApp.getRequestHandler();

    const {
        SERVICE_SECRET,
        PAGE_CACHE_DIR,
        IMAGE_CACHE_DIR,
        IS_FAILOVER_INSTANCE,
        ENV,
    } = process.env;

    const isFailover = IS_FAILOVER_INSTANCE === 'true';

    if (!isFailover && PAGE_CACHE_DIR) {
        nextApp.server.incrementalCache.incrementalOptions.pagesDir =
            PAGE_CACHE_DIR;
    }

    if (IMAGE_CACHE_DIR) {
        nextApp.server.imageResponseCache.incrementalCache.cacheDir =
            IMAGE_CACHE_DIR;
    }

    if (isFailover && ENV === 'prod') {
        // Assets from /_next and internal apis should be served as normal
        server.get(
            ['/_next/*', '/api/internal/*', '/internal/*'],
            (req, res) => {
                return nextRequestHandler(req, res);
            }
        );

        // We don't want the full site to be publicly available via failover instance.
        // This is served via the public-facing regular frontend when needed
        server.all('*', (req, res) => {
            if (req.headers.secret !== SERVICE_SECRET) {
                return res.status(404).send();
            }

            return nextRequestHandler(req, res);
        });
    } else {
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

    server.all('*', (req, res) => {
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

        // Ensure the isReady-api is called when running locally
        if (ENV === 'localhost') {
            fetch(`http://localhost:${port}/api/internal/isReady`);
        }

        if (!isFailover) {
            initHeartbeat();
        }
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
