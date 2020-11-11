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

const sanitizeUrl = (url) => encodeURI(url).replace(/\+/g, '%2B');

const fetchRedirects = async () => {
    const redirects = await Promise.race([
        new Promise((res) =>
            setTimeout(() => {
                console.error(`Failed to fetch redirects: service timed out`);
                res(null);
            }, 5000)
        ),
        fetch(`${process.env.XP_ORIGIN}/_/service/no.nav.navno/redirects`).then(
            (res) => {
                if (res.ok) {
                    return res.json();
                }
                throw res.statusText;
            }
        ),
    ]).catch((err) => console.error(`Failed to fetch redirects: ${err}`));

    if (!redirects) {
        return [];
    }

    return redirects
        .filter(
            (redirect) => redirect && redirect.source && redirect.destination
        )
        .map((redirect) => ({
            source: sanitizeUrl(redirect.source),
            destination: sanitizeUrl(redirect.destination),
            permanent: false,
        }));
};

module.exports = configWithAllTheThings({
    assetPrefix: process.env.APP_ORIGIN,
    env: {
        APP_ORIGIN: process.env.APP_ORIGIN,
    },
    rewrites: async () => [
        {
            source: '/sitemap.xml',
            destination: `${process.env.XP_ORIGIN}/_/legacy/sitemap.xml`,
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
    redirects: fetchRedirects,
});
