const withLess = require('@zeit/next-less');
const withImages = require('next-images');
const packageJson = require('./package.json');

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

module.exports = configWithAllTheThings({
    basePath: '/person/nav-enonicxp-frontend', // Remove when going live
    assetPrefix: process.env.APP_ORIGIN,
    env: {
        APP_ORIGIN: process.env.APP_ORIGIN,
    },
    rewrites: async () => [
        {
            source: '/sitemap.xml',
            destination: `${process.env.APP_ORIGIN}/api/sitemap`,
        },
    ],
    headers: async () => {
        return [
            {
                source: '/_next/(.*)',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: process.env.ADMIN_ORIGIN,
                    },
                ],
            },
        ];
    },
});
