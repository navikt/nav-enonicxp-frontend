import express from 'express';
import proxy from 'express-http-proxy';
import {
    fetchDecoratorHtml,
    fetchDecoratorReact,
} from '@navikt/nav-dekoratoren-moduler/ssr';

const app = express();
const appPort = 3001;

app.get('/internal/isAlive', (req, res) => {
    return res.status(200).send('I am alive!');
});

app.get('/internal/isReady', (req, res) => {
    return res.status(200).send('I am ready!');
});

app.use(
    '*',
    proxy('http://localhost:3000', {
        userResDecorator: async function (
            proxyRes,
            proxyResData,
            userReq,
            userRes
        ) {
            if (proxyRes.headers['content-type']?.startsWith('text/html')) {
                const decoratorParams = proxyRes.headers[
                    'decorator-params'
                ] as string;

                const params = decoratorParams
                    ? JSON.parse(decoratorParams)
                    : {};

                const {
                    DECORATOR_STYLES,
                    DECORATOR_SCRIPTS,
                    DECORATOR_HEADER,
                    DECORATOR_FOOTER,
                } = await fetchDecoratorHtml({
                    ...params,
                    env: 'localhost',
                    port: 8100,
                });

                return proxyResData
                    .toString()
                    .replace('<head>', `<head>${DECORATOR_STYLES}`)
                    .replace(
                        '<body>',
                        `<body>${DECORATOR_SCRIPTS}${DECORATOR_HEADER}`
                    )
                    .replace('</body>', `</body>${DECORATOR_FOOTER}`);
            }
            return proxyResData;
        },
    })
);

const server = app.listen(appPort, () => {
    console.log(`Server starting on port ${appPort}`);
});

const shutdown = () => {
    console.log('Server shutting down');

    server.close(() => {
        console.log('Shutdown complete!');
        process.exit(0);
    });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
