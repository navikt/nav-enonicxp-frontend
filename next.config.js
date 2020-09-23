const { createSecureHeaders } = require('next-secure-headers');
const withLess = require('@zeit/next-less');
const packageJson = require('./package.json');

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
        basePath: process.env.APP_BASE_PATH,
        async headers() {
            return [
                {
                    source: '/(.*)',
                    headers: createSecureHeaders({
                        frameGuard: false,
                    }),
                },
            ];
        },
    })
);
