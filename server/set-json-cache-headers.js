const onHeaders = require('on-headers');

// Set cache headers on json files from the incremental cache to ensure
// data requested during client side navigation is always "fresh" if cached
// by browsers/proxies/CDNs etc
const setJsonCacheHeaders = (req, res) => {
    onHeaders(res, () => {
        res.setHeader('Cache-Control', 's-maxage=0, must-revalidate');
    });
};

module.exports = { setJsonCacheHeaders };
