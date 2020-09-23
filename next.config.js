const withLess = require('@zeit/next-less');
const packageJson = require('./package.json');
const { createSecureHeaders } = require('./src/utils/next-secure-headers/lib');

const navFrontendModuler = [];
Object.keys(packageJson.dependencies).forEach((key) => {
    if (key.startsWith('nav-frontend-')) {
        navFrontendModuler.push(key);
    }
});

const withTranspileModules = require('next-transpile-modules')([
    ...navFrontendModuler,
    '@navikt/nav-dekoratoren-moduler',
]);

module.exports = withTranspileModules(
    withLess({
        async headers() {
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
