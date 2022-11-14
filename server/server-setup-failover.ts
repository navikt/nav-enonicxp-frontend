import { Express } from 'express';
import { NextServer } from 'next/dist/server/next';

import { getNextServer, setImageCacheDir } from './next-utils';
import { validateSecret } from './req-handlers/validate-secret';

export const serverSetupFailover = (
    expressApp: Express,
    nextApp: NextServer
) => {
    const nextRequestHandler = nextApp.getRequestHandler();
    const nextServer = getNextServer(nextApp);

    setImageCacheDir(nextServer);

    // Assets from /_next and internal apis should be served as normal
    expressApp.get(['/_next/*', '/api/internal/*'], (req, res) => {
        return nextRequestHandler(req, res);
    });

    // We don't want the full site to be publicly available via failover instance.
    // This is served via the public-facing regular frontend when needed
    expressApp.all('*', (req, res) => {
        if (req.headers.secret !== process.env.SERVICE_SECRET) {
            return res.status(404).send();
        }

        return nextRequestHandler(req, res);
    });
};
