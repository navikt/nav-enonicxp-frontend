import { Express } from 'express';
import { NextServer } from 'next/dist/server/next';

const DEV_NAIS_DOMAIN = 'ansatt.dev.nav.no';
const APP_ORIGIN = process.env.APP_ORIGIN;

// Redirects requests for other domains to the ansatt.dev.nav.no
export const serverSetupDev = (expressApp: Express, nextApp: NextServer) => {
    const nextRequestHandler = nextApp.getRequestHandler();

    expressApp.all('*', (req, res, next) => {
        res.setHeader('X-Robots-Tag', 'noindex');
        next();
    });

    // These paths should never redirect, to ensure the site will load correctly
    // when accessed from the Content Studio editor
    expressApp.all(
        ['/draft/*', '/archive/*', '/editor/*', '/_next/*', '/gfx/*', '/api/*'],
        (req, res) => {
            return nextRequestHandler(req, res);
        }
    );

    if (APP_ORIGIN.endsWith(DEV_NAIS_DOMAIN)) {
        expressApp.all('*', (req, res, next) => {
            if (!req.hostname.endsWith(DEV_NAIS_DOMAIN)) {
                return res.redirect(302, `${APP_ORIGIN}${req.path}`);
            }

            next();
        });
    }
};
