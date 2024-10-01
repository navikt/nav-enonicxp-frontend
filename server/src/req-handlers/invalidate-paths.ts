import { RequestHandler } from 'express';
import PageCacheHandler from 'cache/page-cache-handler';
import { logger } from 'srcCommon/logger';
import escapeHtml from 'escape-html';

export const handleInvalidatePathsReq: RequestHandler = (req, res) => {
    const { eventid = '' } = req.headers;
    const { paths } = req.body;

    if (!Array.isArray(paths)) {
        const msg = `Invalid path array for event ${escapeHtml(eventid.toString())}`;
        logger.error(msg);
        res.status(400).send(msg);
        return;
    }

    const cacheHandler = new PageCacheHandler();

    const sanitizedPaths = paths.map((path) => escapeHtml(path.toString()));
    sanitizedPaths.forEach((path) => cacheHandler.delete(path));

    const msg = `Received cache invalidation event for ${sanitizedPaths.length} paths - event id ${escapeHtml(eventid.toString())}`;
    logger.info(msg);

    res.status(200).send(msg);
};
