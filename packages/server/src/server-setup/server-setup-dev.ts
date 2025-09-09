import { Express } from 'express';
import { InferredNextWrapperServer } from 'server';

const DEV_NAIS_DOMAIN = 'ansatt.dev.nav.no';
const APP_ORIGIN = process.env.APP_ORIGIN;

// Redirects requests for other domains to the ansatt.dev.nav.no.
// For example, www.intern.dev.nav.no (legacy) will be redirected to www.ansatt.dev.nav.no
export const serverSetupDev = (expressApp: Express, nextApp: InferredNextWrapperServer) => {
    const nextRequestHandler = nextApp.getRequestHandler();

    expressApp.all('/*path', (req, res, next) => {
        res.setHeader('X-Robots-Tag', 'noindex');
        next();
    });

    // These paths should never redirect, to ensure the site will load correctly
    // when accessed via other applications (Content Studio editor or external archive/version history frontend)
    expressApp.all(
        [
            '/render-from-props',
            '/draft{/*path}',
            '/archive{/*path}',
            '/editor{/*path}',
            '/gfx{/*path}',
            '/api{/*path}',
            '/_/*path',
        ],
        (req, res) => {
            return nextRequestHandler(req, res);
        }
    );

    if (APP_ORIGIN.endsWith(DEV_NAIS_DOMAIN)) {
        expressApp.all('/*path', (req, res, next) => {
            if (!req.hostname.endsWith(DEV_NAIS_DOMAIN)) {
                // return res.redirect(302, `${APP_ORIGIN}${req.path}`);
            }

            next();
        });
    }
};
