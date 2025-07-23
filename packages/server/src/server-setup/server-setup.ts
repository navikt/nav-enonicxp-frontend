import express, { Express, Request, Response } from 'express';
import { getNextBuildId } from 'next-utils';
import { handleInvalidatePathsReq } from 'req-handlers/invalidate-paths';
import { setCacheKey } from 'req-handlers/set-cache-key';
import { handleInvalidateAllReq } from 'req-handlers/invalidate-all';
import { serverSetupDev } from 'server-setup/server-setup-dev';
import { logger } from '@/shared/logger';
import PageCacheHandler, { redisCache } from 'cache/page-cache-handler';
import {
    addDecoratorUpdateListener,
    getDecoratorVersionId,
} from '@navikt/nav-dekoratoren-moduler/ssr';
import { decoratorEnvProps } from '@/shared/decorator-utils-serverside';
import { buildValidateSecretMiddleware } from '../req-handlers/validate-secret-middleware';
import { InferredNextWrapperServer } from 'server';

export const serverSetup = async (expressApp: Express, nextApp: InferredNextWrapperServer) => {
    const jsonBodyParser = express.json();

    const validateSecretMiddleware = buildValidateSecretMiddleware(nextApp);

    const nextRequestHandler = nextApp.getRequestHandler();
    const currentBuildId = await getNextBuildId();

    const decoratorVersionId = await getDecoratorVersionId(decoratorEnvProps);
    if (!decoratorVersionId) {
        logger.error('Failed to fetch decorator version id!');
    }

    await redisCache.init(currentBuildId, decoratorVersionId);

    addDecoratorUpdateListener(decoratorEnvProps, (versionId) => {
        logger.info(`New decorator version: ${versionId} - clearing render caches`);
        redisCache.updateRenderCacheKeyPrefix(versionId);
        new PageCacheHandler().clear();
    });

    logger.info(`Current build id: ${currentBuildId}`);

    // Store build ID in environment for middleware access
    process.env.NEXT_BUILD_ID = currentBuildId;

    console.log('[SERVER SETUP] Setting up invalidate routes...');
    try {
        expressApp.post(
            '/invalidate',
            validateSecretMiddleware,
            jsonBodyParser,
            setCacheKey,
            handleInvalidatePathsReq
        );

        expressApp.get(
            '/invalidate/wipe-all',
            validateSecretMiddleware,
            setCacheKey,
            handleInvalidateAllReq
        );
        console.log('[SERVER SETUP] Invalidate routes setup completed');
    } catch (error) {
        console.error('[SERVER SETUP] Error setting up invalidate routes:', error);
        throw error;
    }

    if (process.env.ENV === 'dev1' || process.env.ENV === 'dev2') {
        console.log('[SERVER SETUP] Setting up dev routes...');
        try {
            // serverSetupDev(expressApp, nextApp);
            console.log('[SERVER SETUP] Dev routes setup completed');
        } catch (error) {
            console.error('[SERVER SETUP] Error setting up dev routes:', error);
            throw error;
        }
    }

    // Handle all remaining requests with Next.js
    console.log('[SERVER SETUP] Setting up final catch-all handler...');
    try {
        expressApp.use((req: Request, res: Response) => {
            console.log(`[SERVER SETUP] Final catch-all handler: ${req.method} ${req.url}`);
            return nextRequestHandler(req, res);
        });
        console.log('[SERVER SETUP] Final catch-all handler setup completed');
    } catch (error) {
        console.error('[SERVER SETUP] Error setting up final catch-all handler:', error);
        throw error;
    }
};
