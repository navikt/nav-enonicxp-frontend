import { RequestHandler } from 'express';
import CustomCacheHandler from '../cache/custom-cache-handler';

export const handleInvalidateAllReq: RequestHandler = async (req, res) => {
    const { eventid } = req.headers;

    await new CustomCacheHandler().clear();

    const msg = `Cleared page cache - event id ${eventid}`;
    console.log(msg);

    return res.status(200).send(msg);
};
