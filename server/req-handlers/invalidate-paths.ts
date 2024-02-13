import { RequestHandler } from 'express';
import CustomCacheHandler from '../cache/custom-cache-handler';

export const handleInvalidatePathsReq: RequestHandler = (req, res) => {
    const { eventid } = req.headers;
    const { paths } = req.body;

    if (!Array.isArray(paths)) {
        const msg = `Invalid path array for event ${eventid}`;
        console.error(msg);
        return res.status(400).send(msg);
    }

    const isrCacheHandler = new CustomCacheHandler();

    paths.forEach((path) => isrCacheHandler.deleteGlobalCacheEntry(path));

    const msg = `Received cache invalidation event for ${paths.length} paths - event id ${eventid}`;
    console.log(msg);

    return res.status(200).send(msg);
};
