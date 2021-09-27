const fs = require('fs');

const invalidateCachedPage = (path, app) => {
    try {
        const pageCacheBasePath =
            app.server.incrementalCache.incrementalOptions.pagesDir;

        const htmlPath = `${pageCacheBasePath}${path}.html`;
        const jsonPath = `${pageCacheBasePath}${path}.json`;

        if (fs.existsSync(htmlPath)) {
            fs.unlinkSync(htmlPath);
        }

        if (fs.existsSync(jsonPath)) {
            fs.unlinkSync(jsonPath);
        }

        app.server.incrementalCache.cache.del(path);

        console.log(`Invalidated cache for path ${path}`);
    } catch (e) {
        console.error(
            `Error occurred while invalidating cache for path ${path} - ${e}`
        );
    }
};

module.exports = { invalidateCachedPage };
