require('dotenv').config();

const express = require('express');
const next = require('next');
const { setJsonCacheHeaders } = require('./set-json-cache-headers');
const {
    handleInvalidateReq,
    handleInvalidateAllReq,
    setCacheKey,
} = require('./incremental-cache');
const { initHeartbeat } = require('./revalidator-proxy-heartbeat');

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
        setCacheKey,
        handleInvalidateReq(nextApp)
    );

    server.get(
        '/invalidate/wipe-all',
        verifySecret,
        setCacheKey,
        handleInvalidateAllReq(nextApp)
    );

    server.all('*', async (req, res) => {
        const { failover } = req.headers;

        if (failover === 'true') {
            const url = `${process.env.FAILOVER_ORIGIN}${req.path}`;
            console.log(`Failover to ${url}`);

            const failoverContent = await fetch(url)
                .then((res) => {
                    if (res.ok) {
                        return res.text();
                    }

                    console.error(`Bad response from failover`);
                    return null;
                })
                .catch((e) => {
                    console.error(`Failback error: ${e}`);
                    return null;
                });

            if (failoverContent) {
                return res.send(failoverContent);
            } else {
                res.status(500);
                return nextApp.renderError(null, req, res, req.path);
            }
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
