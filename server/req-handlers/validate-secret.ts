import { RequestHandler } from 'express';
import { NextServer } from 'next/dist/server/next';
import { logger } from '../logger';

export const validateSecret =
    (nextApp: NextServer): RequestHandler =>
    (req, res, next) => {
        if (req.headers.secret !== process.env.SERVICE_SECRET) {
            logger.warn(`Invalid secret for ${req.path}`);
            res.status(404);
            return nextApp.renderError(null, req, res, req.path);
        }

        next();
    };
