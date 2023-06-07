import cookieParser from 'cookie-parser';
import { Express } from 'express';
import { NextServer } from 'next/dist/server/next';

const LOGIN_COOKIE = 'dev-login';

// 155.55.* is NAVs public IP range. Also includes the private IP range used by
// nais, and localhost. Takes the IPv6 prefix ::ffff: into account.
const isNavIp = (ip: string) => /^(::ffff:)?(155\.55\.|10\.|127\.)/.test(ip);

// Applies certain restrictions for the app in dev environments. This is not meant
// for security purposes, but rather to ensure (to some degree) that the public does
// not accidentally end up in our (possibly confusing!) dev environments
export const serverSetupDev = (expressApp: Express, nextApp: NextServer) => {
    const nextRequestHandler = nextApp.getRequestHandler();

    // Trust proxy IP headers, to ensure we get the actual req.ip for the client
    expressApp.set('trust proxy', true);

    expressApp.all('*', (req, res, next) => {
        res.setHeader('X-Robots-Tag', 'noindex');
        next();
    });

    // These paths should always be unrestricted, to ensure the site will always load
    // when accessed from the Content Studio editor
    expressApp.all(['/draft/*', '/_next/*', '/gfx/*', '/api/*'], (req, res) => {
        return nextRequestHandler(req, res);
    });

    // Sets a cookie which will bypass the IP restriction
    expressApp.get('/login', (req, res) => {
        return res
            .cookie(LOGIN_COOKIE, true, { maxAge: 3600 * 24 })
            .redirect(302, '/');
    });

    expressApp.all('*', cookieParser(), (req, res, next) => {
        if (isNavIp(req.ip) || req.cookies[LOGIN_COOKIE]) {
            return next();
        }

        console.log(
            `Non-authorized client ips: ${req.ip} ${JSON.stringify(req.ips)}`
        );

        return res.status(401).send('Ingen tilgang');
    });
};
