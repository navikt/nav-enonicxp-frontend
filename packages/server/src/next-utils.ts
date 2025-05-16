import NextNodeServer from 'next/dist/server/next-server';
import { NextServer } from 'next/dist/server/next';

import { InferredNextWrapperServer } from 'server';

// Functions for accessing private next.js internals

// Note: there are additional worker instances of the next server,
// used for handling requests.
// This function only returns the top level instance
export const getNextServer = async (
    nextApp: InferredNextWrapperServer
): Promise<NextNodeServer> => {
    return nextApp['init']['server'];
};

export const getNextBuildId = (nextServer: NextNodeServer) => {
    return nextServer['getBuildId']();
};
