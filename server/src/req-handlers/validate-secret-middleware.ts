import { RequestHandler } from 'express';
import { NextServer } from 'next/dist/server/next';
import { logger } from 'srcCommon/logger';
import { validateSecretHeader } from 'srcCommon/auth';

export const buildValidateSecretMiddleware =
    (nextApp: NextServer): RequestHandler =>
    (req, res, next) => {
        if (!validateSecretHeader(req)) {
            logger.warn(`Invalid secret for ${req.path}`);
            res.status(404);
            return nextApp.renderError(null, req, res, req.path);
        }

        next();
    };
