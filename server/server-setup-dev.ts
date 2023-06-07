import cookieParser from 'cookie-parser';
import { Express } from 'express';
import { NextServer } from 'next/dist/server/next';

const LOGIN_COOKIE = 'dev-login';

const isNavIp = (ip: string) => ip.startsWith('155.55');

export const serverSetupDev = (expressApp: Express, nextApp: NextServer) => {
    const nextRequestHandler = nextApp.getRequestHandler();

    expressApp.set('trust proxy', true);

    expressApp.all('*', (req, res, next) => {
        res.setHeader('X-Robots-Tag', 'noindex');
        next();
    });

    expressApp.all(['/draft/*', '/_next/*', '/gfx/*', '/api/*'], (req, res) => {
        return nextRequestHandler(req, res);
    });

    expressApp.get('/login', (req, res) => {
        return res
            .cookie(LOGIN_COOKIE, true, { maxAge: 3600 * 24 })
            .redirect(302, '/');
    });

    expressApp.all('*', cookieParser(), (req, res, next) => {
        console.log(`Client ip: ${req.ip} ${JSON.stringify(req.ips)}`);

        if (isNavIp(req.ip) || req.cookies[LOGIN_COOKIE]) {
            return next();
        }

        return res.status(401).send('Ingen tilgang');
    });
};
