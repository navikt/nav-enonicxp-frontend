const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const withLess = require('next-with-less');
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

module.exports = withPlugins([withLess, withImages, withTranspileModules], {
    assetPrefix: process.env.APP_ORIGIN,
    env: {
        ENV: process.env.ENV,
        APP_ORIGIN: process.env.APP_ORIGIN,
        XP_ORIGIN: process.env.XP_ORIGIN,
        ADMIN_ORIGIN: process.env.ADMIN_ORIGIN,
        INNLOGGINGSTATUS_URL: process.env.INNLOGGINGSTATUS_URL,
    },
    redirects: async () => [
        {
            source: '/www.nav.no',
            destination: '/',
            permanent: false,
        },
        {
            source: '/www.nav.no/:path*',
            destination: '/:path*',
            permanent: false,
        },
        {
            source: '/Global%20Utlogging',
            destination: '/global-utlogging',
            permanent: true,
        },
    ],
    rewrites: async () => [
        {
            source: '/sitemap.xml',
            destination: '/api/sitemap',
        },
        // Send some very common 404-resulting requests directly to 404
        // to prevent unnecessary backend-calls
        {
            source: '/autodiscover/autodiscover.xml',
            destination: '/404',
        },
        {
            source: '/Forsiden/driftsmelding',
            destination: '/404',
        },
        {
            source: '/_public/beta.nav.no/:path*',
            destination: '/404',
        },
        ...(process.env.ENV === 'localhost'
            ? [
                  {
                      source: '/_/:path*',
                      destination: 'http://localhost:8080/_/:path*',
                  },
                  {
                      source: '/admin/site/preview/default/draft/:path*',
                      destination:
                          'http://localhost:8080/admin/site/preview/default/draft/:path*',
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
        {
            source: '/(.*)',
            headers: [
                {
                    key: 'Permissions-Policy',
                    value: 'interest-cohort=()',
                },
            ],
        },
    ],
    // webpack: (config) => {
    //     config.module.rules.push({
    //         test: /\.(le|c)ss$/,
    //         use: [
    //             MiniCssExtractPlugin.loader,
    //             {
    //                 loader: 'css-loader',
    //             },
    //             {
    //                 loader: 'less-loader',
    //                 options: {
    //                     sourceMap: true,
    //                 },
    //             },
    //         ],
    //     });
    //
    //     config.plugins.push(
    //         new MiniCssExtractPlugin({
    //             filename: 'static/css/[name].css',
    //             chunkFilename: 'static/css/[contenthash].css',
    //         })
    //     );
    //
    //     return config;
    // },
});
