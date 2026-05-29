import { Express } from 'express';

import { validateSecretHeader } from '@/shared/auth';
import { InferredNextWrapperServer } from 'server';
import { logger } from '@/shared/logger';

export const serverSetupFailover = (expressApp: Express, nextApp: InferredNextWrapperServer) => {
    logger.info('Setting up failover server');
    const nextRequestHandler = nextApp.getRequestHandler();

    // Assets from /_next and internal apis should be served as normal
    expressApp.get(['/_next{/*path}', '/api/internal{/*path}'], (req, res) => {
        return nextRequestHandler(req, res);
    });

    // We don't want the full site to be publicly available via failover instance.
    // This is served via the public-facing regular frontend when needed
    expressApp.all('/{*path}', (req, res) => {
        if (!validateSecretHeader(req)) {
            res.status(404).send();
            return;
        }

        return nextRequestHandler(req, res);
    });
};
