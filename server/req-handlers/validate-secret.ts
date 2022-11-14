import { RequestHandler } from 'express';
import { NextServer } from 'next/dist/server/next';

export const validateSecret =
    (nextApp: NextServer): RequestHandler =>
    (req, res, next) => {
        console.log('Validating secret');
        if (req.headers.secret !== process.env.SERVICE_SECRET) {
            console.warn(`Invalid secret for ${req.path}`);
            res.status(404);
            return nextApp.renderError(null, req, res, req.path);
        }

        next();
    };
