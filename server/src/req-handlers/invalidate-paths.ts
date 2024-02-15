import { RequestHandler } from 'express';
import CustomCacheHandler from 'cache/custom-cache-handler';
import { logger } from 'srcCommon/logger';

export const handleInvalidatePathsReq: RequestHandler = (req, res) => {
    const { eventid } = req.headers;
    const { paths } = req.body;

    if (!Array.isArray(paths)) {
        const msg = `Invalid path array for event ${eventid}`;
        logger.error(msg);
        return res.status(400).send(msg);
    }

    const cacheHandler = new CustomCacheHandler();

    paths.forEach((path) => cacheHandler.delete(path));

    const msg = `Received cache invalidation event for ${paths.length} paths - event id ${eventid}`;
    logger.info(msg);

    return res.status(200).send(msg);
};
