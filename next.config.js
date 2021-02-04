const withLess = require('@zeit/next-less');
const withImages = require('next-images');
const packageJson = require('./package.json');
const { NAIS_ENV } = process.env;

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

const runtimeConfig = {};
if (NAIS_ENV !== 'prod') {
    (async () => {
        console.log(`Fetching url-lookup-table from ${NAIS_ENV}`);
        const urlLookupTableUrl = `https://raw.githubusercontent.com/navikt/nav-enonicxp-iac/master/url-lookup-tables/${NAIS_ENV}.json`;
        runtimeConfig.urlLookupTable = await fetch(urlLookupTableUrl)
            .then((res) => res.json())
            .catch((err) => `Failed to fetch url-lookup-table: ${err}`);
    })();
}

module.exports = configWithAllTheThings({
    assetPrefix: process.env.APP_ORIGIN,
    env: {
        NAIS_ENV: process.env.NAIS_ENV,
        APP_ORIGIN: process.env.APP_ORIGIN,
    },
    publicRuntimeConfig: {
        runtimeConfig,
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
