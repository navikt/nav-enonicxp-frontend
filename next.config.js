const withLess = require('@zeit/next-less');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const packageJson = require('./package.json');

const navFrontendModuler = Object.keys(packageJson.dependencies).reduce(
    (acc, key) => (key.startsWith('nav-frontend-') ? acc.concat(key) : acc),
    []
);

const withTranspileModules = require('next-transpile-modules')([
    ...navFrontendModuler,
    '@navikt/nav-dekoratoren-moduler',
    '@navikt/ds-react',
    '@navikt/ds-icons',
]);

const configWithAllTheThings = (config) =>
    withTranspileModules(withLess(withCSS(withImages(config))));

module.exports = configWithAllTheThings({
    assetPrefix: process.env.APP_ORIGIN,
    env: {
        ENV: process.env.ENV,
        APP_ORIGIN: process.env.APP_ORIGIN,
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
        // Send some very common 404-resulting requests directly to 404
        // to prevent unnecessary backend-calls
        {
            source: '/autodiscover/autodiscover.xml',
            destination: `${process.env.APP_ORIGIN}/404`,
        },
        {
            source: '/Forsiden/driftsmelding',
            destination: `${process.env.APP_ORIGIN}/404`,
        },
        {
            source: '/_public/beta.nav.no/:path*',
            destination: `${process.env.APP_ORIGIN}/404`,
        },
        ...(process.env.ENV === 'localhost'
            ? [
                  {
                      source: '/_/:path*',
                      destination: 'http://localhost:8080/_/:path*',
                  },
              ]
            : []),
        ...(process.env.ENV === 'dev'
            ? [
                  {
                      source: '/_/:path*',
                      destination: 'https://www-q1.nav.no/_/:path*',
                  },
              ]
            : []),
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
