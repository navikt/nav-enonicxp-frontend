const withLess = require('@zeit/next-less');
const withImages = require('next-images');
const packageJson = require('./package.json');
const { createSecureHeaders } = require('./src/utils/next-secure-headers/lib');

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
    env: {
        XP_ORIGIN: process.env.XP_ORIGIN,
    },
    headers: async () => {
        return [
            {
                source: '/(.*)',
                headers: createSecureHeaders({
                    contentSecurityPolicy: {
                        directives: { frameAncestors: '*' },
                    },
                }),
            },
        ];
    },
    redirects: async () => {
        return [
            { source: '/', destination: '/no/person', permanent: true },
            {
                source: '/Forsiden',
                destination: '/no/person',
                permanent: true,
            },
        ];
    },
});
