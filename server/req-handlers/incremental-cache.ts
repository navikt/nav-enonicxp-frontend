import fsPromises from 'fs/promises';
import fs from 'fs';
import NextNodeServer from 'next/dist/server/next-server';
import { RequestHandler } from 'express';
import FileSystemCache from 'next/dist/server/lib/incremental-cache/file-system-cache';

const removePageCacheFile = async (
    nextServer: NextNodeServer,
    pathname: string
) =>
    (
        nextServer['responseCache'].incrementalCache
            .cacheHandler as FileSystemCache
    )
        ['getFsPath'](pathname, false)
        .then(({ filePath }: { filePath: string }) =>
            fsPromises.unlink(filePath)
        )
        .then(() => {
            console.log(`Removed file from page cache: ${pathname}`);
        })
        .catch((e: any) => {
            console.log(
                `Failed to remove file from page cache: ${pathname} - ${e}`
            );
        });

const invalidateCachedPage = async (
    path: string,
    nextServer: NextNodeServer
) => {
    const pagePath = path === '/' ? '/index' : path;

    return Promise.all([
        removePageCacheFile(nextServer, `${pagePath}.html`),
        removePageCacheFile(nextServer, `${pagePath}.json`),
    ])
        .then(() => {
            console.log(`Removing page data from memory cache: ${pagePath}`);

            const wasCached =
                nextServer[
                    'responseCache'
                ].incrementalCache.cacheHandler.memoryCache.has(pagePath);

            nextServer[
                'responseCache'
            ].incrementalCache.cacheHandler.memoryCache.del(pagePath);

            const isStillCached =
                nextServer[
                    'responseCache'
                ].incrementalCache.cacheHandler.memoryCache.has(pagePath);

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

const wipePageCache = async (nextServer: NextNodeServer) => {
    try {
        const { filePath: pageCacheBasePath } = await nextServer[
            'responseCache'
        ].incrementalCache.cacheHandler.getFsPath('', false);

        if (fs.existsSync(pageCacheBasePath)) {
            fs.rmSync(pageCacheBasePath, { recursive: true });
        }

        nextServer[
            'responseCache'
        ].incrementalCache.cacheHandler.memoryCache.reset();

        console.log('Wiped all cached pages!');
        return true;
    } catch (e) {
        console.error(`Error occurred while wiping page-cache - ${e}`);
        return false;
    }
};

export const handleInvalidateAllReq =
    (nextServer: NextNodeServer): RequestHandler =>
    (req, res) => {
        const { eventid } = req.headers;

        wipePageCache(nextServer).then((success) => {
            success
                ? res
                      .status(200)
                      .send(
                          `Successfully wiped page cache - event id ${eventid}`
                      )
                : res
                      .status(500)
                      .send(`Failed to wipe page cache! - event id ${eventid}`);
        });
    };

let currentCacheTimestamp = 0;

export const setCacheKey: RequestHandler = (req, res, next) => {
    const { cache_key, cache_ts } = req.headers;

    if (typeof cache_key === 'string') {
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
        console.error(`No valid cache key provided - ${cache_key}`);
    }

    next();
};

export const handleInvalidateReq =
    (nextServer: NextNodeServer): RequestHandler =>
    (req, res) => {
        const { eventid } = req.headers;

        const { paths } = req.body;

        if (!Array.isArray(paths)) {
            const msg = `Invalid path array for event ${eventid}`;
            console.error(msg);
            return res.status(400).send(msg);
        }

        paths.forEach((path) => invalidateCachedPage(path, nextServer));

        const msg = `Received cache invalidation event for ${paths.length} paths - event id ${eventid}`;
        console.log(msg);

        return res.status(200).send(msg);
    };
