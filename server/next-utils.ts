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

// The type for this function is not exported from next.js
// Be aware it may change when updating the next.js version
export type GetFsPathFunction = (
    pathname: string,
    appDir?: boolean
) => Promise<{
    filePath: string;
    isAppPath: boolean;
}>;

export const getIncrementalCacheGetFsPathFunction = (
    nextServer: NextNodeServer
): GetFsPathFunction => {
    const cacheHandler =
        nextServer['responseCache'].incrementalCache.cacheHandler;
    return cacheHandler['getFsPath'].bind(cacheHandler);
};
