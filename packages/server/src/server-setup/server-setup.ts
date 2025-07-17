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

    if (process.env.ENV === 'dev1' || process.env.ENV === 'dev2') {
        serverSetupDev(expressApp, nextApp);
    }

    // Handle all remaining requests with Next.js
    expressApp.use((req: Request, res: Response) => {
        return nextRequestHandler(req, res);
    });
};
