import { RequestHandler } from 'express';
import PageCacheHandler from 'cache/page-cache-handler';
import { logger } from '@/common/logger';

export const handleInvalidateAllReq: RequestHandler = async (req, res) => {
    const { eventid } = req.headers;

    await new PageCacheHandler().clear();

    const msg = `Cleared page cache - event id ${eventid}`;
    logger.info(msg);

    return res.status(200).send(msg);
};
