import cookieParser from 'cookie-parser';
import { Express } from 'express';
import { NextServer } from 'next/dist/server/next';
import { logger } from 'srcCommon/logger';

const LOGIN_COOKIE = 'dev-login';

const DEV_NAIS_DOMAIN = 'ansatt.dev.nav.no';
const APP_ORIGIN = process.env.APP_ORIGIN;

// Applies certain restrictions for the app in dev environments. This is not intended
// as a security measure, but rather to ensure (to some degree) that the public does
// not accidentally end up in our dev environments
export const serverSetupDev = (expressApp: Express, nextApp: NextServer) => {
    const nextRequestHandler = nextApp.getRequestHandler();

    expressApp.all('*', (req, res, next) => {
        res.setHeader('X-Robots-Tag', 'noindex');
        next();
    });

    // These paths should always be unrestricted, to ensure the site will always load
    // when accessed from the Content Studio editor
    expressApp.all(['/draft/*', '/_next/*', '/gfx/*', '/api/*'], (req, res) => {
        return nextRequestHandler(req, res);
    });

    logger.info(`App origin: ${APP_ORIGIN}`);

    if (APP_ORIGIN.endsWith(DEV_NAIS_DOMAIN)) {
        logger.info('Enabling redirects');
        // Redirects requests to previously used domain names (intern|ekstern).dev.nav.no
        expressApp.all('*', (req, res, next) => {
            logger.info(`Hostname is ${req.hostname}`);
            if (!req.hostname.endsWith(DEV_NAIS_DOMAIN)) {
                logger.info('Redirecting!');
                return res.redirect(302, `${APP_ORIGIN}${req.path}`);
            }

            next();
        });
    }
};
