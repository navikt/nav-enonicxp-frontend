import express, { Express, Request, Response } from 'express';
import { NextServer } from 'next/dist/server/next';
import onHeaders from 'on-headers';
import { validateSecret } from 'req-handlers/validate-secret';
import { getNextBuildId, getNextServer } from 'next-utils';
import { handleInvalidatePathsReq } from 'req-handlers/invalidate-paths';
import { setCacheKey } from 'req-handlers/set-cache-key';
import { handleInvalidateAllReq } from 'req-handlers/invalidate-all';
import { handleGetPendingResponses } from 'req-handlers/pending-responses';
import { serverSetupDev } from 'server-setup/server-setup-dev';
import { logger } from 'srcCommon/logger';
import { redisCache } from 'cache/page-cache-handler';

// Set the no-cache header on json files from the incremental cache to ensure
// data requested during client side navigation is always validated if cached
// by browsers/proxies/CDNs etc
const setJsonCacheHeaders = (req: Request, res: Response) => {
    onHeaders(res, () => {
        res.setHeader('Cache-Control', 'no-cache');
    });
};

export const serverSetup = async (expressApp: Express, nextApp: NextServer) => {
    const jsonBodyParser = express.json();

    const validateSecretMiddleware = validateSecret(nextApp);

    const nextRequestHandler = nextApp.getRequestHandler();
    const nextServer = await getNextServer(nextApp);
    const currentBuildId = getNextBuildId(nextServer);

    await redisCache.init(currentBuildId);

    logger.info(`Current build id: ${currentBuildId}`);

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

    const surpriseRecipients = new Set(['d5214f2ccd0c', 'user:system:su']);

    expressApp.get('/api/surprise', (req, res) => {
        const { uid } = req.query;
        const lastUidSegment = (uid as string)?.split('-').slice(-1)[0];

        const isSurprised = surpriseRecipients.has(lastUidSegment);

        return res
            .header('Access-Control-Allow-Origin', process.env.ADMIN_ORIGIN)
            .header('Access-Control-Allow-Credentials', 'true')
            .cookie('surprise', isSurprised, {
                maxAge: 1000 * 3600 * 24,
            })
            .json({ message: isSurprised ? 'Surprise activated!' : 'No surprise for you!' });
    });

    expressApp.get('/api/pending', validateSecretMiddleware, handleGetPendingResponses(nextServer));

    if (process.env.ENV === 'dev1' || process.env.ENV === 'dev2') {
        serverSetupDev(expressApp, nextApp);
    }

    expressApp.get('/_next/data/:buildId/*.json', (req, res) => {
        const { buildId } = req.params;
        if (buildId !== currentBuildId) {
            logger.info(`Expected build-id ${currentBuildId}, got ${buildId} on ${req.path}`);
            req.url = req.url.replace(buildId, currentBuildId);
        }

        setJsonCacheHeaders(req, res);
        return nextRequestHandler(req, res);
    });

    expressApp.all('*', (req, res) => {
        return nextRequestHandler(req, res);
    });
};
