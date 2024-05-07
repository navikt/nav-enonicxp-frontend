import cookieParser from 'cookie-parser';
import { Express } from 'express';
import { NextServer } from 'next/dist/server/next';
import { logger } from 'srcCommon/logger';

const LOGIN_COOKIE = 'dev-login';

const DEV_NAIS_DOMAIN = 'ansatt.dev.nav.no';
const APP_ORIGIN = process.env.APP_ORIGIN;

// 155.55.* is NAVs public IP range. Also includes the private IP range used by our
// internal network (10.*), and localhost. Takes the IPv6 prefix ::ffff: into account.
const isNavIp = (ip?: string) => ip && /^(::ffff:)?(155\.55\.|10\.|127\.)/.test(ip);

// Applies certain restrictions for the app in dev environments. This is not intended
// as a security measure, but rather to ensure (to some degree) that the public does
// not accidentally end up in our dev environments
export const serverSetupDev = (expressApp: Express, nextApp: NextServer) => {
    const nextRequestHandler = nextApp.getRequestHandler();

    // Trust proxy IP headers, to ensure we get the actual req.ip for the client
    // expressApp.set('trust proxy', true);

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
        logger.info(`Enabling redirects`);
        // Redirects requests to previously used domain names (intern|ekstern).dev.nav.no
        expressApp.all('*', (req, res, next) => {
            if (!req.hostname.endsWith(DEV_NAIS_DOMAIN)) {
                return res.redirect(302, `${APP_ORIGIN}${req.path}`);
            }

            next();
        });
    }

    // // Sets a cookie which will bypass the IP restriction
    // expressApp.get('/login', (req, res) => {
    //     return res.cookie(LOGIN_COOKIE, true, { maxAge: 1000 * 3600 * 24 }).redirect(302, '/');
    // });
    //
    // expressApp.all('*', cookieParser(), (req, res, next) => {
    //     if (isNavIp(req.ip) || req.cookies[LOGIN_COOKIE]) {
    //         return next();
    //     }
    //
    //     logger.info(`Non-authorized client ips: ${req.ip} ${JSON.stringify(req.ips)}`);
    //
    //     return res
    //         .status(401)
    //         .send(
    //             'Hei! Dette er et internt testmiljø som benyttes for å teste ny funksjonalitet for NAVs nettsider. ' +
    //                 'Besøk <a href="https://www.nav.no">www.nav.no</a> for å komme til NAVs offentlige nettsted.<br/><br/>' +
    //                 'Dersom du ønsker tilgang til testmiljøet, besøk www.ekstern.dev.nav.no/login for å få tilgang i 24 timer. ' +
    //                 'Obs: Sidene i testmiljøet kan være uferdige eller inneholde feil!'
    //         );
    // });
};
