import express, { Express, Request, Response } from 'express';
import { NextServer } from 'next/dist/server/next';
import NextNodeServer from 'next/dist/server/next-server';
import onHeaders from 'on-headers';

import { validateSecret } from './req-handlers/validate-secret';
import {
    getNextBuildId,
    getNextServer,
    setImageCacheDir,
    setPageCacheDir,
} from './next-utils';
import { handleInvalidatePathsReq } from './req-handlers/invalidate-paths';
import { setCacheKey } from './req-handlers/set-cache-key';
import { handleInvalidateAllReq } from './req-handlers/invalidate-all';

// Temporary spammy logging to investigate an occasional hang on cache-response for certain paths
const logPendingResponses =
    process.env.ENV !== 'localhost'
        ? (nextServer: NextNodeServer) => {
              try {
                  const pendingResponses =
                      nextServer['responseCache'].pendingResponses;
                  if (pendingResponses?.size > 0) {
                      console.log(
                          `Pending responses: ${JSON.stringify([
                              ...pendingResponses.keys(),
                          ])}`
                      );
                  }
              } catch (e) {
                  console.error(`Error accessing pendingResponses - ${e}`);
              }
          }
        : () => ({});

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

    setPageCacheDir(nextServer);
    setImageCacheDir(nextServer);

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
        logPendingResponses(nextServer);

        return nextRequestHandler(req, res);
    });
};
