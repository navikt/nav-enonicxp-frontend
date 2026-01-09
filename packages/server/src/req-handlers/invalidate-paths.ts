import { RequestHandler } from 'express';
import { logger } from '@/shared/logger';
import PageCacheHandler from 'cache/page-cache-handler';

export const handleInvalidatePathsReq: RequestHandler = (req, res) => {
    const { eventid = '' } = req.headers;
    const paths = req.body.paths as string[];

    if (!Array.isArray(paths)) {
        const msg = 'Invalid path array for event';
        logger.error(msg, { metaData: { eventid } });
        res.status(400).send(msg);
        return;
    }

    const cacheHandler = new PageCacheHandler();

    paths.forEach((path) => cacheHandler.delete(path));

    const msg = 'Received cache invalidation event';
    logger.info(msg, { metaData: { pathCount: paths.length, eventid } });

    res.status(200).send(msg);
};
