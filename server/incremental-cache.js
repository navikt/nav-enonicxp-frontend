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

        app.server.incrementalCache.cache.set(path, {
            isStale: true,
            revalidateAfter: new Date().getTime() - 1000,
            value: null,
        });

        console.log(`Invalidated page cache for path ${path}`);
    } catch (e) {
        console.error(
            `Error occurred while invalidating page cache for path ${path} - ${e}`
        );
    }
};

const wipePageCache = (app) => {
    try {
        const pageCacheBasePath =
            app.server.incrementalCache.incrementalOptions.pagesDir;

        if (fs.existsSync(pageCacheBasePath)) {
            fs.rmSync(pageCacheBasePath, { recursive: true });
        }

        app.server.incrementalCache.cache.reset();

        console.log('Wiped all cached pages!');
    } catch (e) {
        console.error(`Error occurred while wiping page-cache - ${e}`);
    }
};

module.exports = { invalidateCachedPage, wipePageCache };
