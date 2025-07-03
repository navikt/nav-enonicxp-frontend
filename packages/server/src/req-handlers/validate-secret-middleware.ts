import { RequestHandler } from 'express';

import { logger } from '@/shared/logger';
import { validateSecretHeader } from '@/shared/auth';
import { InferredNextWrapperServer } from 'server';

export const buildValidateSecretMiddleware =
    (nextApp: InferredNextWrapperServer): RequestHandler =>
    (req, res, next) => {
        if (!validateSecretHeader(req)) {
            logger.warn(`Invalid secret for ${req.path}`);
            res.status(404);
            return nextApp.renderError(null, req, res, req.path);
        }

        next();
    };
