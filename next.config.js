const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withLess = require('next-with-less');

// Remove dashes from js variable names for classnames generated from CSS-modules
// Enables all CSS-classes to be accessed from javascript with dot-notation
const cssModulesNoDashesInClassnames = (config) => {
    const rules = config.module.rules
        .find((rule) => typeof rule.oneOf === 'object')
        .oneOf.filter((rule) => Array.isArray(rule.use));

    rules.forEach((rule) => {
        rule.use.forEach((moduleLoader) => {
            if (/css-loader([\/\\])(cjs|dist|src)/.test(moduleLoader.loader)) {
                if (typeof moduleLoader.options.modules === 'object') {
                    moduleLoader.options.modules = {
                        ...moduleLoader.options.modules,
                        exportLocalsConvention: 'dashesOnly',
                    };
                }
            }
        });
    });
};

const withTranspileModules = require('next-transpile-modules')([
    '@navikt/ds-react',
    '@navikt/ds-icons',
]);

const isFailover = process.env.IS_FAILOVER_APP === 'true';

console.log(`Env: ${process.env.NODE_ENV} ${isFailover}`);

module.exports = withPlugins([withLess, withImages, withTranspileModules], {
    distDir: isFailover ? '.next-static' : '.next',
    assetPrefix: isFailover
        ? process.env.FAILOVER_ORIGIN
        : process.env.APP_ORIGIN,
    env: {
        ENV: process.env.ENV,
        APP_ORIGIN: process.env.APP_ORIGIN,
        XP_ORIGIN: process.env.XP_ORIGIN,
        ADMIN_ORIGIN: process.env.ADMIN_ORIGIN,
        INNLOGGINGSSTATUS_URL: process.env.INNLOGGINGSSTATUS_URL,
    },
    webpack: (config) => {
        cssModulesNoDashesInClassnames(config);
        return config;
    },
    redirects: async () => [
        {
            source: '/',
            destination: '/no/person',
            permanent: true,
        },
        {
            source: '/forsiden',
            destination: '/no/person',
            permanent: true,
        },
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
        {
            source: '/rss',
            destination: '/api/rss',
        },
        // The historic url for RSS
        {
            source: '/no/rss',
            destination: '/api/rss',
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
        {
            source: '/_/:path*',
            destination: `${process.env.XP_ORIGIN}/_/:path*`,
        },
        ...(process.env.ENV === 'localhost'
            ? [
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
    ],
});
