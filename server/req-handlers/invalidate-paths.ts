import fsPromises from 'fs/promises';
import NextNodeServer from 'next/dist/server/next-server';
import { RequestHandler } from 'express';
import {
    GetFsPathFunction,
    getIncrementalCacheGetFsPathFunction,
} from '../next-utils';

const removePageCacheFile = async (
    getFsPath: GetFsPathFunction,
    pathname: string
) =>
    getFsPath(pathname, false)
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
    const getFsPath = getIncrementalCacheGetFsPathFunction(nextServer);

    return Promise.all([
        removePageCacheFile(getFsPath, `${pagePath}.html`),
        removePageCacheFile(getFsPath, `${pagePath}.json`),
    ]).catch((e) => {
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
