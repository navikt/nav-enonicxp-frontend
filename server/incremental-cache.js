const fs = require('fs');
const path = require('next/dist/shared/lib/isomorphic/path');

const pageCacheDir = process.env.PAGE_CACHE_DIR;

const getFsPath = (pathname) => path.join(pageCacheDir, pathname);

const invalidateCachedPage = (path, app) => {
    const pagePath = path === '/' ? '/index' : path;

    try {
        const htmlPath = getFsPath(`${pagePath}.html`);
        const jsonPath = getFsPath(`${pagePath}.json`);

        if (fs.existsSync(htmlPath)) {
            fs.unlinkSync(htmlPath);
        }

        if (fs.existsSync(jsonPath)) {
            fs.unlinkSync(jsonPath);
        }

        app.server.incrementalCache.cacheHandler.memoryCache.del(pagePath);

        console.log(`Invalidated page cache for path ${pagePath}`);
    } catch (e) {
        console.error(
            `Error occurred while invalidating page cache for path ${pagePath} - ${e}`
        );
    }
};

const wipePageCache = (app) => {
    try {
        const pageCacheBasePath = getFsPath('');

        if (fs.existsSync(pageCacheBasePath)) {
            fs.rmSync(pageCacheBasePath, { recursive: true });
        }

        app.server.incrementalCache.cacheHandler.memoryCache.reset();

        console.log('Wiped all cached pages!');
        return true;
    } catch (e) {
        console.error(`Error occurred while wiping page-cache - ${e}`);
        return false;
    }
};

const handleInvalidateAllReq = (app) => (req, res) => {
    const { eventid } = req.headers;

    const success = wipePageCache(app);

    return success
        ? res
              .status(200)
              .send(`Successfully wiped page cache - event ${eventid}`)
        : res.status(500).send(`Failed to wipe page cache! - event ${eventid}`);
};

let currentCacheTimestamp = 0;

const setCacheKey = (req, res, next) => {
    const { cache_key, cache_ts } = req.headers;

    if (cache_key) {
        const newCacheTimestamp = Number(cache_ts);
        if (newCacheTimestamp > currentCacheTimestamp) {
            console.log(
                `Setting new cache key ${cache_key} with timestamp ${cache_ts}`
            );
            global.cacheKey = cache_key;
            currentCacheTimestamp = newCacheTimestamp;
        } else {
            console.log(
                `Rejecting cache key ${cache_key} with timestamp ${newCacheTimestamp} - current cache key ${global.cacheKey} is same or newer (${currentCacheTimestamp})`
            );
        }
    } else {
        console.error('No cache key provided!');
    }

    next();
};

const handleInvalidateReq = (app) => (req, res) => {
    const { eventid } = req.headers;

    try {
        const { paths } = req.body;

        if (!Array.isArray(paths)) {
            const msg = `Invalid path array for event ${eventid}`;
            console.error(msg);
            return res.status(400).send(msg);
        }

        paths.forEach((path) => invalidateCachedPage(path, app));

        const msg = `Invalidated cached pages for ${paths.length} paths - event ${eventid}`;
        console.log(msg);

        return res.status(200).send(msg);
    } catch (e) {
        return res
            .status(500)
            .send(
                `Error while invalidating cache - event: ${eventid} - error: ${e}`
            );
    }
};

module.exports = {
    handleInvalidateReq,
    handleInvalidateAllReq,
    setCacheKey,
    getFsPath,
};
