import { Express } from 'express';

import { validateSecretHeader } from '@/shared/auth';
import { InferredNextWrapperServer } from 'server';

export const serverSetupFailover = (expressApp: Express, nextApp: InferredNextWrapperServer) => {
    const nextRequestHandler = nextApp.getRequestHandler();

    // Assets from /_next and internal apis should be served as normal
    expressApp.get(['/_next/*', '/api/internal/*'], (req, res) => {
        return nextRequestHandler(req, res);
    });

    // We don't want the full site to be publicly available via failover instance.
    // This is served via the public-facing regular frontend when needed
    expressApp.all('*', (req, res) => {
        if (!validateSecretHeader(req)) {
            res.status(404).send();
            return;
        }

        return nextRequestHandler(req, res);
    });
};
