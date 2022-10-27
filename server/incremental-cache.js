const fsPromises = require('fs/promises');
const fs = require('fs');

const removePageCacheFile = async (nextApp, pathname) =>
    nextApp.server.responseCache.incrementalCache.cacheHandler
        .getFsPath(pathname, false)
        .then(({ filePath }) => fsPromises.unlink(filePath))
        .then(() => {
            console.log(`Removed file from page cache: ${pathname}`);
        })
        .catch((e) => {
            console.log(
                `Failed to remove file from page cache: ${pathname} - ${e}`
            );
        });

const invalidateCachedPage = async (path, nextApp) => {
    const pagePath = path === '/' ? '/index' : path;

    return Promise.all([
        removePageCacheFile(nextApp, `${pagePath}.html`),
        removePageCacheFile(nextApp, `${pagePath}.json`),
    ])
        .then(() => {
            console.log(`Removing page data from memory cache: ${pagePath}`);

            const wasCached =
                nextApp.server.responseCache.incrementalCache.cacheHandler.memoryCache.has(
                    pagePath
                );

            nextApp.server.responseCache.incrementalCache.cacheHandler.memoryCache.del(
                pagePath
            );

            const isStillCached =
                nextApp.server.responseCache.incrementalCache.cacheHandler.memoryCache.has(
                    pagePath
                );

            console.log(
                `Was cached: ${wasCached} - Is still cached: ${isStillCached}`
            );
        })
        .catch((e) => {
            console.error(
                `Error occurred while invalidating page cache for path ${pagePath} - ${e}`
            );
        });
};

const wipePageCache = async (nextApp) => {
    try {
        const { filePath: pageCacheBasePath } =
            await nextApp.server.responseCache.incrementalCache.cacheHandler.getFsPath(
                '',
                false
            );

        if (fs.existsSync(pageCacheBasePath)) {
            fs.rmSync(pageCacheBasePath, { recursive: true });
        }

        nextApp.server.responseCache.incrementalCache.cacheHandler.memoryCache.reset();

        console.log('Wiped all cached pages!');
        return true;
    } catch (e) {
        console.error(`Error occurred while wiping page-cache - ${e}`);
        return false;
    }
};

const handleInvalidateAllReq = (app) => (req, res) => {
    const { eventid } = req.headers;

    wipePageCache(app).then((success) => {
        success
            ? res
                  .status(200)
                  .send(`Successfully wiped page cache - event id ${eventid}`)
            : res
                  .status(500)
                  .send(`Failed to wipe page cache! - event id ${eventid}`);
    });
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

    const { paths } = req.body;

    if (!Array.isArray(paths)) {
        const msg = `Invalid path array for event ${eventid}`;
        console.error(msg);
        return res.status(400).send(msg);
    }

    paths.forEach((path) => invalidateCachedPage(path, app));

    const msg = `Received cache invalidation event for ${paths.length} paths - event id ${eventid}`;
    console.log(msg);

    return res.status(200).send(msg);
};

module.exports = {
    handleInvalidateReq,
    handleInvalidateAllReq,
    setCacheKey,
};
