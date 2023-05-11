import express, { Express, Request, Response } from 'express';
import { NextServer } from 'next/dist/server/next';
import onHeaders from 'on-headers';

import { validateSecret } from './req-handlers/validate-secret';
import { getNextBuildId, getNextServer } from './next-utils';
import { handleInvalidatePathsReq } from './req-handlers/invalidate-paths';
import { setCacheKey } from './req-handlers/set-cache-key';
import { handleInvalidateAllReq } from './req-handlers/invalidate-all';
import { handleGetPendingResponses } from './req-handlers/pending-responses';
import { getRequestMeta } from 'next/dist/server/request-meta';

// Set the no-cache header on json files from the incremental cache to ensure
// data requested during client side navigation is always validated if cached
// by browsers/proxies/CDNs etc
const setJsonCacheHeaders = (req: Request, res: Response) => {
    onHeaders(res, () => {
        res.setHeader('Cache-Control', 'no-cache');
    });
};

export const serverSetup = (expressApp: Express, nextApp: NextServer) => {
    const jsonBodyParser = express.json();

    const validateSecretMiddleware = validateSecret(nextApp);

    const nextRequestHandler = nextApp.getRequestHandler();
    const nextServer = getNextServer(nextApp);
    const currentBuildId = getNextBuildId(nextServer);

    console.log(`Current build id: ${currentBuildId}`);

    if (process.env.IS_EDITOR_ONLY === 'true') {
        expressApp.all(
            ['/draft/*', '/_next/*', '/gfx/*', '/api/*'],
            (req, res) => {
                return nextRequestHandler(req, res);
            }
        );

        return;
    }

    expressApp.post(
        '/invalidate',
        validateSecretMiddleware,
        jsonBodyParser,
        setCacheKey,
        handleInvalidatePathsReq(nextServer)
    );

    expressApp.get(
        '/invalidate/wipe-all',
        validateSecretMiddleware,
        setCacheKey,
        handleInvalidateAllReq(nextServer)
    );

    expressApp.get(
        '/api/pending',
        validateSecretMiddleware,
        handleGetPendingResponses(nextServer)
    );

    expressApp.get('/_next/data/:buildId/*.json', (req, res) => {
        const { buildId } = req.params;
        if (buildId !== currentBuildId) {
            console.log(
                `Expected build-id ${currentBuildId}, got ${buildId} on ${req.path}`
            );
            req.url = req.url.replace(buildId, currentBuildId);
        }

        setJsonCacheHeaders(req, res);
        return nextRequestHandler(req, res);
    });

    expressApp.all('*', (req, res) => {
        return nextRequestHandler(req, res);
    });
};
