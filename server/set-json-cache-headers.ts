import onHeaders from 'on-headers';

// Set the no-cache header on json files from the incremental cache to ensure
// data requested during client side navigation is always validated if cached
// by browsers/proxies/CDNs etc
export const setJsonCacheHeaders = (req, res) => {
    onHeaders(res, () => {
        res.setHeader('Cache-Control', 'no-cache');
    });
};
