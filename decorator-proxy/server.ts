import express from 'express';
import proxy from 'express-http-proxy';
import {
    Elements,
    fetchDecoratorHtml,
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
    proxy('http://nav-enonicxp-frontend-dev1', {
        userResDecorator: async function (
            proxyRes,
            proxyResData,
            userReq,
            userRes
        ) {
            const decoratorParams = proxyRes.headers['decorator-params'];

            if (typeof decoratorParams !== 'string') {
                return proxyResData;
            }

            const params = JSON.parse(
                Buffer.from(decoratorParams, 'base64').toString('ascii')
            );

            const decorator = await fetchDecoratorHtml({
                ...params,
                env: 'dev',
            });

            return proxyResData
                .toString()
                .replace(
                    /DECORATOR_(STYLES|HEADER|FOOTER|SCRIPTS)/g,
                    (match: keyof Elements) => {
                        return decorator[match];
                    }
                );
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
