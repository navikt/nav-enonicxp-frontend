import cookieParser from 'cookie-parser';
import { Express } from 'express';
import { NextServer } from 'next/dist/server/next';

const LOGIN_COOKIE = 'dev-login';

export const serverSetupDev = (expressApp: Express, nextApp: NextServer) => {
    const nextRequestHandler = nextApp.getRequestHandler();

    expressApp.all('*', (req, res, next) => {
        res.setHeader('X-Robots-Tag', 'noindex');
        next();
    });

    expressApp.all(['/draft/*', '/_next/*', '/gfx/*', '/api/*'], (req, res) => {
        return nextRequestHandler(req, res);
    });

    expressApp.get('/login', (req, res) => {
        return res
            .cookie(LOGIN_COOKIE, true, { maxAge: 3600 * 24 * 365 })
            .redirect(302, '/');
    });

    expressApp.all('*', cookieParser(), (req, res, next) => {
        console.log(req.ip);

        if (req.cookies[LOGIN_COOKIE]) {
            return next();
        }

        return res.status(401).send('Ingen tilgang');
    });
};
