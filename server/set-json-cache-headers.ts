import onHeaders from 'on-headers';
import { Request, Response } from 'express';

// Set the no-cache header on json files from the incremental cache to ensure
// data requested during client side navigation is always validated if cached
// by browsers/proxies/CDNs etc
export const setJsonCacheHeaders = (req: Request, res: Response) => {
    onHeaders(res, () => {
        res.setHeader('Cache-Control', 'no-cache');
    });
};
