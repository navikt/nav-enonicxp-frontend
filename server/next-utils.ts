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
