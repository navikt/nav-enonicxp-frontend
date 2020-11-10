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

const fetchRedirects = async () => {
    const redirects = await fetch(
        `${process.env.XP_ORIGIN}/_/service/no.nav.navno/redirects`
    )
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw `Failed to fetch redirects: ${res.statusText}`;
        })
        .catch(console.error);

    return redirects
        .filter(
            (redirect) => redirect && redirect.source && redirect.destination
        )
        .map((redirect) => ({
            source: encodeURI(redirect.source.replace(/\+/g, '%2B')),
            destination: encodeURI(redirect.destination.replace(/\+/g, '%2B')),
            permanent: false,
        }));
};

module.exports = configWithAllTheThings({
    assetPrefix: process.env.APP_ORIGIN,
    env: {
        APP_ORIGIN: process.env.APP_ORIGIN,
    },
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
    redirects: fetchRedirects,
});
