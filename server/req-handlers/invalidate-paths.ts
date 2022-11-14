import fsPromises from 'fs/promises';
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

export const handleInvalidatePathsReq =
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
