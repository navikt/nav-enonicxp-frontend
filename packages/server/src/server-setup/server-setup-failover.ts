import { Express } from 'express';

import { validateSecretHeader } from '@/shared/auth';
import { InferredNextWrapperServer } from 'server';

export const serverSetupFailover = (expressApp: Express, nextApp: InferredNextWrapperServer) => {
    const nextRequestHandler = nextApp.getRequestHandler();

    // Assets from /_next and internal apis should be served as normal
    expressApp.get('/_next/*', (req, res) => {
        console.log(`[FAILOVER] Handling /_next route: ${req.method} ${req.url}`);
        return nextRequestHandler(req, res);
    });

    expressApp.get('/api/internal/*', (req, res) => {
        console.log(`[FAILOVER] Handling /api/internal route: ${req.method} ${req.url}`);
        return nextRequestHandler(req, res);
    });

    // We don't want the full site to be publicly available via failover instance.
    // This is served via the public-facing regular frontend when needed
    expressApp.all('*', (req, res) => {
        console.log(`[FAILOVER] Handling catch-all route: ${req.method} ${req.url}`);
        if (!validateSecretHeader(req)) {
            res.status(404).send();
            return;
        }

        return nextRequestHandler(req, res);
    });
};
