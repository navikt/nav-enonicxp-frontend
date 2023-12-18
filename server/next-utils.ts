import NextNodeServer from 'next/dist/server/next-server';
import { NextServer } from 'next/dist/server/next';
import { ImageOptimizerCache } from 'next/dist/server/image-optimizer';

// Helper functions for accessing private class members (very naughty!)
//
export const getNextServer = async (
    nextApp: NextServer
): Promise<NextNodeServer> => {
    return nextApp['getServer']();
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

    nextServer['imageResponseCache'].get = async function (...args: unknown[]) {
        const context = args[2] as { incrementalCache: ImageOptimizerCache };

        try {
            context.incrementalCache['cacheDir'] = cacheDir;
        } catch (e) {
            console.error(`Failed to set imageResponseCache cacheDir - ${e}`);
        }

        return imgResCacheGetOriginal(...args);
    };
};
