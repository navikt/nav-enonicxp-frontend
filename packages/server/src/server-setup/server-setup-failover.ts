import { Express } from 'express';

import { validateSecretHeader } from '@/shared/auth';
import { InferredNextWrapperServer } from 'server';

export const serverSetupFailover = (expressApp: Express, nextApp: InferredNextWrapperServer) => {
    const nextRequestHandler = nextApp.getRequestHandler();

    console.log('[FAILOVER] Starting failover setup...');

    // Assets from /_next and internal apis should be served as normal
    try {
        console.log('[FAILOVER] Setting up /_next/* route...');
        // Try more explicit pattern instead of /*
        expressApp.get('/_next/:path(*)', (req, res) => {
            console.log(`[FAILOVER] Handling /_next route: ${req.method} ${req.url}`);
            return nextRequestHandler(req, res);
        });
        console.log('[FAILOVER] /_next/* route setup completed');
    } catch (error) {
        console.error('[FAILOVER] Error setting up /_next/* route:', error);
        throw error;
    }

    try {
        console.log('[FAILOVER] Setting up /api/internal/* route...');
        // Try more explicit pattern instead of /*
        expressApp.get('/api/internal/:path(*)', (req, res) => {
            console.log(`[FAILOVER] Handling /api/internal route: ${req.method} ${req.url}`);
            return nextRequestHandler(req, res);
        });
        console.log('[FAILOVER] /api/internal/* route setup completed');
    } catch (error) {
        console.error('[FAILOVER] Error setting up /api/internal/* route:', error);
        throw error;
    }

    // We don't want the full site to be publicly available via failover instance.
    // This is served via the public-facing regular frontend when needed
    try {
        console.log('[FAILOVER] Setting up catch-all route...');
        expressApp.all('*', (req, res) => {
            console.log(`[FAILOVER] Handling catch-all route: ${req.method} ${req.url}`);
            if (!validateSecretHeader(req)) {
                res.status(404).send();
                return;
            }

            return nextRequestHandler(req, res);
        });
        console.log('[FAILOVER] Catch-all route setup completed');
    } catch (error) {
        console.error('[FAILOVER] Error setting up catch-all route:', error);
        throw error;
    }

    console.log('[FAILOVER] All failover routes setup completed');
};
