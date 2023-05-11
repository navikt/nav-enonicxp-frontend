import NextNodeServer from 'next/dist/server/next-server';
import { NextServer } from 'next/dist/server/next';

// Helper functions for accessing private class members (very naughty!)
//
export const getNextServer = (nextApp: NextServer) => {
    return nextApp['server'] as NextNodeServer;
};

export const getNextBuildId = (nextServer: NextNodeServer) => {
    return nextServer['getBuildId']();
};

export const injectImageResponseCacheCacheDir = (
    nextServer: NextNodeServer,
    cacheDir: string
) => {
    const imgResCacheGetOriginal = nextServer['imageResponseCache'].get.bind(
        nextServer['imageResponseCache']
    );

    nextServer['imageResponseCache'].get = async function (
        arg1: any,
        arg2: any,
        context: any
    ) {
        try {
            context.incrementalCache.cacheDir = cacheDir;
        } catch (e) {
            console.error(`Failed to set imageResponseCache cacheDir - ${e}`);
        }

        return imgResCacheGetOriginal(arg1, arg2, context);
    };
};
