const withPlugins = require('next-compose-plugins');
const withTranspileModules = require('next-transpile-modules')([
    '@navikt/ds-react',
    '@navikt/ds-icons',
]);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE_BUNDLE === 'true',
});

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

// Inject the dangerouslyAllowSVG flag from the images config into the env config
// Fixes a bug which prevents .svg files from being cached by next/image
const fixNextImageOptsAllowSvg = (config, options) => {
    const dangerouslyAllowSVG = options?.config?.images?.dangerouslyAllowSVG;

    if (dangerouslyAllowSVG === undefined || !config?.plugins) {
        return;
    }

    config.plugins.forEach((plugin) => {
        const __NEXT_IMAGE_OPTS =
            plugin?.definitions?.['process.env.__NEXT_IMAGE_OPTS'];
        if (__NEXT_IMAGE_OPTS) {
            const parsed = JSON.parse(__NEXT_IMAGE_OPTS);
            plugin.definitions['process.env.__NEXT_IMAGE_OPTS'] =
                JSON.stringify({
                    ...parsed,
                    dangerouslyAllowSVG,
                });
        }
    });
};

// Prevents errors due to client-side imports of server-side only libraries
const resolveNodeLibsClientSide = (config, options) => {
    if (!options.isServer) {
        config.resolve.fallback = {
            buffer: false,
            fs: false,
            process: false,
        };
    }
};

const buildCspHeader = () => {
    const getOrigin = (url) => url.replace(/^https?:\/\//, '').split('/')[0];

    const prodOrigin = 'nav.no';
    const prodWithSubdomains = `*.${prodOrigin}`;

    const appOrigin = getOrigin(process.env.APP_ORIGIN);
    const adminOrigin = getOrigin(process.env.ADMIN_ORIGIN);
    const xpOrigin = getOrigin(process.env.XP_ORIGIN);
    const decoratorOrigin = getOrigin(process.env.DECORATOR_FALLBACK_URL);
    const innloggingsStatusOrigin = getOrigin(
        process.env.INNLOGGINGSSTATUS_URL
    );

    const vergicOrigin = '*.psplugin.com'; // screen sharing
    const boostOrigin = `nav.boost.ai${
        process.env.ENV !== 'prod' ? ' staging-nav.boost.ai' : ''
    }`; // chatbot
    const qbrickOrigin = 'video.qbrick.com';
    const vimeoPlayerOrigin = 'player.vimeo.com';
    const vimeoCdnOrigin = '*.vimeocdn.com'; // used for video preview images

    const gaOrigin = 'www.google-analytics.com';
    const gtmOrigin = 'www.googletagmanager.com';
    const hotjarOrigin = '*.hotjar.com';
    const taOrigin = '*.taskanalytics.com ta-survey-v2.herokuapp.com';

    // These are used by a NAV-funded research project for accessibility-related feedback
    const tingtunOrigin = '*.tingtun.no';
    const termerOrigin = 'termer.no';
    const tiTiOrigins = [tingtunOrigin, termerOrigin].join(' ');

    // Filter duplicates, as some origins may be identical, depending on
    // deployment environment
    const internalOrigins = [
        prodWithSubdomains,
        ...[
            appOrigin,
            adminOrigin,
            xpOrigin,
            decoratorOrigin,
            innloggingsStatusOrigin,
        ].filter(
            (origin, index, array) =>
                !origin.endsWith(prodOrigin) && array.indexOf(origin) === index
        ),
    ].join(' ');

    const externalOriginsServices = [vergicOrigin, boostOrigin].join(' ');

    const externalOriginsAnalytics = [
        taOrigin,
        hotjarOrigin,
        gtmOrigin,
        gaOrigin,
    ].join(' ');

    // NOTES:
    // script unsafe-eval and worker blob: is required by the psplugin script
    // unsafe-inline script is required by GTM
    // unsafe-inline style is required by several third party modules
    // next.js dev mode requires ws: and unsafe-eval
    return [
        `default-src ${internalOrigins} ${externalOriginsServices} ${externalOriginsAnalytics}${
            process.env.NODE_ENV === 'development' ? ' ws:' : ''
        }`,
        `script-src ${internalOrigins} ${externalOriginsServices} ${externalOriginsAnalytics} ${tiTiOrigins} 'unsafe-inline' 'unsafe-eval'`,
        `worker-src ${internalOrigins} blob:`,
        `style-src ${internalOrigins} ${vergicOrigin} 'unsafe-inline'`,
        `font-src ${internalOrigins} ${vergicOrigin} data:`,
        `img-src ${internalOrigins} ${vimeoCdnOrigin} ${vergicOrigin} ${gaOrigin} data:`,
        `frame-src ${qbrickOrigin} ${vimeoPlayerOrigin} ${hotjarOrigin} ${gtmOrigin}`,
    ].join('; ');
};

const isFailover = process.env.IS_FAILOVER_INSTANCE === 'true';
const isLocal = process.env.ENV === 'localhost';

console.log(
    `Env: ${process.env.ENV} - Node env: ${process.env.NODE_ENV} - Failover: ${isFailover}`
);

module.exports = withPlugins([withTranspileModules, withBundleAnalyzer], {
    distDir: isFailover && isLocal ? '.next-static' : '.next',
    assetPrefix: isFailover
        ? process.env.FAILOVER_ORIGIN
        : process.env.APP_ORIGIN,
    env: {
        ENV: process.env.ENV,
        APP_ORIGIN: process.env.APP_ORIGIN,
        XP_ORIGIN: process.env.XP_ORIGIN,
        ADMIN_ORIGIN: process.env.ADMIN_ORIGIN,
        FAILOVER_ORIGIN: process.env.FAILOVER_ORIGIN,
        IS_FAILOVER_INSTANCE: process.env.IS_FAILOVER_INSTANCE,
        INNLOGGINGSSTATUS_URL: process.env.INNLOGGINGSSTATUS_URL,
        NAVNO_API_URL: process.env.NAVNO_API_URL,
    },
    images: {
        minimumCacheTTL: isFailover ? 3600 * 24 * 365 : 3600 * 24,
        dangerouslyAllowSVG: true,
        domains: [process.env.APP_ORIGIN, process.env.XP_ORIGIN].map((origin) =>
            // Domain whitelist must not include protocol prefixes
            origin?.replace(/^https?:\/\//, '')
        ),
        deviceSizes: [480, 768, 1024, 1440],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    webpack: (config, options) => {
        fixNextImageOptsAllowSvg(config, options);
        cssModulesNoDashesInClassnames(config);
        resolveNodeLibsClientSide(config, options);

        const { webpack, buildId } = options;

        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env.BUILD_ID': JSON.stringify(buildId),
            })
        );

        return config;
    },
    redirects: async () => [
        {
            source: '/forsiden',
            destination: '/',
            permanent: false,
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
            source: '/frontendlogger/:path*',
            destination: '/404',
        },
        {
            source: '/feilside',
            destination: '/404',
        },
        // /_/* should point to XP services. Rewrite only if XP is on a different origin
        ...(process.env.XP_ORIGIN !== process.env.APP_ORIGIN
            ? [
                  {
                      source: '/_/:path*',
                      destination: `${process.env.XP_ORIGIN}/_/:path*`,
                  },
              ]
            : []),
        ...(isLocal
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
                    value: isFailover
                        ? process.env.APP_ORIGIN
                        : process.env.ADMIN_ORIGIN,
                },
            ],
        },
        {
            source: '/:path*',
            headers: [
                {
                    key: 'app-name',
                    value: 'nav-enonicxp-frontend',
                },
                {
                    key: 'Content-Security-Policy',
                    value: buildCspHeader(),
                },
            ],
        },
    ],
});
