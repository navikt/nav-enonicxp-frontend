import { RequestHandler } from 'express';
import CustomFileSystemCache from '../customCacheHandler';

export const handleInvalidateAllReq: RequestHandler = async (req, res) => {
    const { eventid } = req.headers;

    const isrCache = new CustomFileSystemCache();

    const success = await isrCache.clearGlobalCache();

    return success
        ? res
              .status(200)
              .send(`Successfully wiped page cache - event id ${eventid}`)
        : res
              .status(500)
              .send(`Failed to wipe page cache! - event id ${eventid}`);
};
