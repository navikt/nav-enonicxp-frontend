const onHeaders = require('on-headers');

const isJsonCacheUrl = (url) => /_next\/data\/.*\.json/.test(url);

const setJsonCacheHeaders = (req, res) => {
    if (isJsonCacheUrl(req.url)) {
        onHeaders(res, () => {
            res.setHeader('Cache-Control', 'no-cache');
        });
    }
};

module.exports = { setJsonCacheHeaders };
