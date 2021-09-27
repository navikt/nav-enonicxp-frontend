const fs = require('fs');

const invalidateCachedPage = (path, app) => {
    try {
        const pageCacheBasePath =
            app.server.incrementalCache.incrementalOptions.pagesDir;

        const htmlPath = `${pageCacheBasePath}${path}.html`;
        const jsonPath = `${pageCacheBasePath}${path}.json`;
        console.log('paths:', htmlPath, jsonPath);

        if (fs.existsSync(htmlPath)) {
            console.log('removing html');
            fs.unlinkSync(htmlPath);
        }

        if (fs.existsSync(jsonPath)) {
            console.log('removing json');
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
