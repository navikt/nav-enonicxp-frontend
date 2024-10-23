import NextNodeServer from 'next/dist/server/next-server';
import { NextServer } from 'next/dist/server/next';

// Functions for accessing private next.js internals

// Note: there are additional worker instances of the next server,
// used for handling requests.
// This function only returns the top level instance
export const getNextServer = async (nextApp: NextServer): Promise<NextNodeServer> => {
    return nextApp['getServer']();
};

export const getNextBuildId = (nextServer: NextNodeServer) => {
    return nextServer['getBuildId']();
};
