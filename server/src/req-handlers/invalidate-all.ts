import { RequestHandler } from 'express';
import CustomFileSystemCache from 'cache/custom-cache-handler';

export const handleInvalidateAllReq: RequestHandler = async (req, res) => {
    const { eventid } = req.headers;

    const isrCacheHandler = new CustomFileSystemCache();

    const success = await isrCacheHandler.clearGlobalCache();

    return success
        ? res
              .status(200)
              .send(`Successfully wiped page cache - event id ${eventid}`)
        : res
              .status(500)
              .send(`Failed to wipe page cache! - event id ${eventid}`);
};
