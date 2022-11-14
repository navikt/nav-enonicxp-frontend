import NextNodeServer from 'next/dist/server/next-server';
import { NextServer } from 'next/dist/server/next';

export const setPageCacheDir = (nextServer: NextNodeServer) => {
    const { PAGE_CACHE_DIR } = process.env;

    if (!PAGE_CACHE_DIR) {
        console.warn(`Page cache dir was not set, using Next.js default`);
        return;
    }

    try {
        nextServer[
            'responseCache'
        ].incrementalCache.cacheHandler.serverDistDir = PAGE_CACHE_DIR;

        console.log(`Set page cache dir to ${PAGE_CACHE_DIR}`);
    } catch (e) {
        console.error(
            `Failed to set page cache dir to ${PAGE_CACHE_DIR} - ${e}`
        );
    }
};

export const setImageCacheDir = (nextServer: NextNodeServer) => {
    const { IMAGE_CACHE_DIR } = process.env;

    if (!IMAGE_CACHE_DIR) {
        console.warn(`Image cache dir was not set, using Next.js default`);
        return;
    }

    try {
        nextServer['imageResponseCache'].incrementalCache.cacheDir =
            IMAGE_CACHE_DIR;

        console.log(`Set Image cache dir to ${IMAGE_CACHE_DIR}`);
    } catch (e) {
        console.error(
            `Failed to set Image cache dir to ${IMAGE_CACHE_DIR} - ${e}`
        );
    }
};

export const getNextServer = (nextApp: NextServer) => {
    return nextApp['server'] as NextNodeServer;
};
