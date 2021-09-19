const fs = require('fs');

const cacheBasePath = './.next/server/pages';

const invalidateCacheForPath = (path, app) => {
    try {
        const htmlPath = `${cacheBasePath}${path}.html`;
        const jsonPath = `${cacheBasePath}${path}.json`;

        if (fs.existsSync(htmlPath)) {
            fs.unlinkSync(`${cacheBasePath}${path}.html`);
        }

        if (fs.existsSync(jsonPath)) {
            fs.unlinkSync(`${cacheBasePath}${path}.json`);
        }

        app.server.incrementalCache.cache.del(path);

        console.log(`Invalidated cache for path ${path}`);
    } catch (e) {
        console.error(
            `Error occurred while invalidating cache for path ${path} - ${e}`
        );
    }
};

exports.invalidateCache = invalidateCacheForPath;
