const withLess = require('@zeit/next-less');
const withImages = require('next-images');
const packageJson = require('./package.json');
const fs = require('fs');

const navFrontendModuler = Object.keys(packageJson.dependencies).reduce(
    (acc, key) => (key.startsWith('nav-frontend-') ? acc.concat(key) : acc),
    []
);

const withTranspileModules = require('next-transpile-modules')([
    ...navFrontendModuler,
    '@navikt/nav-dekoratoren-moduler',
]);

const configWithAllTheThings = (config) =>
    withTranspileModules(withLess(withImages(config)));

const getUrlLookupTable = () =>
    JSON.stringify(
        JSON.parse(
            process.env.NAIS_ENV === 'localhost'
                ? fs.readFileSync('local-url-lookup-table.json')
                : fs.readFileSync('url-lookup-table.json')
        )
    );

module.exports = configWithAllTheThings({
    assetPrefix: process.env.APP_ORIGIN,
    env: {
        NAIS_ENV: process.env.NAIS_ENV,
        APP_ORIGIN: process.env.APP_ORIGIN,
        ...(process.env.NAIS_ENV !== 'prod' && {
            URL_LOOKUP_TABLE: getUrlLookupTable(),
        }),
    },
    rewrites: async () => [
        {
            source: '/sitemap.xml',
            destination: `${process.env.APP_ORIGIN}/api/sitemap`,
        },
        {
            source: '/no/rss',
            destination: `${process.env.APP_ORIGIN}/api/rss`,
        },
        {
            source: '/autodiscover/autodiscover.xml',
            destination: `${process.env.APP_ORIGIN}/404`,
        },
        {
            source: '/_public/beta.nav.no/:path*',
            destination: `${process.env.APP_ORIGIN}/404`,
        },
    ],
    headers: async () => [
        {
            source: '/_next/(.*)',
            headers: [
                {
                    key: 'Access-Control-Allow-Origin',
                    value: process.env.ADMIN_ORIGIN,
                },
            ],
        },
    ],
});
