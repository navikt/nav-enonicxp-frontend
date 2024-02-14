import NextNodeServer from 'next/dist/server/next-server';
import { NextServer } from 'next/dist/server/next';
import { ImageOptimizerCache } from 'next/dist/server/image-optimizer';
import ResponseCache from 'next/dist/server/response-cache';
import { propagateServerField } from 'next/dist/server/lib/render-server';
import path from 'path';
import { logger } from './logger';

// Functions for accessing next.js internals in various hacky ways :)

// Note: there are additional worker instances of the next server,
// used for handling requests.
// This function only returns the top level instance
export const getNextServer = async (
    nextApp: NextServer
): Promise<NextNodeServer> => {
    return nextApp['getServer']();
};

export const getNextBuildId = (nextServer: NextNodeServer) => {
    return nextServer['getBuildId']();
};

class ImageCacheWithCustomCacheDir extends ResponseCache {
    private readonly cacheDir: string;

    constructor(minimalMode: boolean, cacheDir: string) {
        logger.info(`Overriding image cache dir to ${cacheDir}`);
        super(minimalMode);
        this.cacheDir = cacheDir;
    }

    public async get(...args: Parameters<ResponseCache['get']>) {
        const context = args[2] as { incrementalCache: ImageOptimizerCache };

        try {
            context.incrementalCache['cacheDir'] = this.cacheDir;
        } catch (e) {
            logger.error(`Failed to set imageResponseCache cacheDir - ${e}`);
        }

        return super.get(...args);
    }
}

export const injectNextImageCacheDir = async (
    nextServer: NextNodeServer,
    cacheDir: string
) => {
    const responseCache = new ImageCacheWithCustomCacheDir(false, cacheDir);

    try {
        nextServer['imageResponseCache'] = responseCache;
    } catch (e) {
        logger.error(`Failed to set image cache dir on main server - ${e}`);
    }

    // Also override the response cache for the request handler worker server
    try {
        const nextDir = nextServer['serverOptions'].dir || '.';

        await propagateServerField(
            path.resolve(nextDir),
            'imageResponseCache' as any,
            responseCache
        );
    } catch (e) {
        logger.error(`Failed to set image cache dir on worker server - ${e}`);
    }
};
