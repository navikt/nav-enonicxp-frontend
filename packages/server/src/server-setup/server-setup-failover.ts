import { Express } from 'express';

import { validateSecretHeader } from '@/shared/auth';
import { InferredNextWrapperServer } from 'server';
import { logger } from '@/shared/logger';
import { getHealthMonitor } from 'health/health-monitor';

export const serverSetupFailover = (expressApp: Express, nextApp: InferredNextWrapperServer) => {
    logger.info('Setting up failover server');
    const nextRequestHandler = nextApp.getRequestHandler();

    // Health check endpoint - must come before catch-all
    expressApp.get('/api/internal/isAlive', (req, res) => {
        const healthMonitor = getHealthMonitor();

        if (!healthMonitor) {
            return res.status(503).json({ message: 'Health monitor not yet initialized' });
        }

        if (healthMonitor.isHealthy()) {
            return res.status(200).json({ message: 'Ok!' });
        }

        const status = healthMonitor.getStatus();
        logger.warn('Health check failed', { metaData: status });
        return res.status(503).json({ message: 'Not healthy', status });
    });

    // Assets from /_next, internal apis, and health render should be served without auth
    expressApp.get(['/_next{/*path}', '/api/internal{/*path}', '/health-render'], (req, res) => {
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
