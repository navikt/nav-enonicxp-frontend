const onHeaders = require('on-headers');

const isJsonCacheUrl = (url) => /_next\/data\/.*\.json/.test(url);

// Set the no-cache header on json files from the incremental cache to ensure
// data requested during client side navigation is always validated if cached
// by browsers/proxies/CDNs etc
const setJsonCacheHeaders = (req, res) => {
    if (isJsonCacheUrl(req.url)) {
        onHeaders(res, () => {
            res.setHeader('Cache-Control', 'no-cache');
        });
    }
};

module.exports = { setJsonCacheHeaders };
