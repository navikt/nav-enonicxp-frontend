import { RequestHandler } from 'express';
import { NextServer } from 'next/dist/server/next';
<<<<<<<< HEAD:packages/server/src/req-handlers/validate-secret.ts
import { logger } from 'shared/logger';
========
import { logger } from 'srcCommon/logger';
import { validateSecretHeader } from 'srcCommon/auth';
>>>>>>>> 1d868f885 (Refactor validering av secret header):packages/server/src/req-handlers/validate-secret-middleware.ts

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
