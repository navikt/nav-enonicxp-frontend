import fs from 'fs';
import NextNodeServer from 'next/dist/server/next-server';
import { RequestHandler } from 'express';
import {
    getIncrementalCacheGetFsPathFunction,
    getIncrementalCacheMemoryCache,
} from '../next-utils';

const wipePageCache = async (nextServer: NextNodeServer) => {
    try {
        const getFsPath = getIncrementalCacheGetFsPathFunction(nextServer);

        const { filePath: pageCacheBasePath } = await getFsPath('', false);

        if (fs.existsSync(pageCacheBasePath)) {
            fs.rmSync(pageCacheBasePath, { recursive: true });
        }

        getIncrementalCacheMemoryCache(nextServer).reset();

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
