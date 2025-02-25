import { RequestHandler } from 'express';
import { logger } from '@/shared/logger';
import PageCacheHandler from 'cache/page-cache-handler';

export const handleInvalidateAllReq: RequestHandler = async (req, res) => {
    const { eventid } = req.headers;

    await new PageCacheHandler().clear();

    const msg = `Cleared page cache - event id ${eventid}`;
    logger.info(msg);

    res.status(200).send(msg);
};
