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
    assetPrefix: process.env.APP_ORIGIN,
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
    redirects: async () => {
        return [
            { source: '/', destination: '/no/person', permanent: false },
            {
                source: '/Forsiden',
                destination: '/no/person',
                permanent: false,
            },
        ];
    },
});
