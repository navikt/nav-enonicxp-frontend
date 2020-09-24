const withLess = require('@zeit/next-less');
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

module.exports = withTranspileModules(
    withLess({
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
    })
);
