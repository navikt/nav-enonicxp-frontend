const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE_BUNDLE === 'true',
});
const { withSentryConfig } = require('@sentry/nextjs');
const { buildCspHeader } = require('@navikt/nav-dekoratoren-moduler/ssr');
const { DATA, UNSAFE_INLINE, UNSAFE_EVAL } = require('csp-header');

const sentryConfig = {
    errorHandler: (err, invokeErr, compilation) => {
        compilation.warnings.push('Sentry CLI Plugin: ' + err.message);
    },
    silent: process.env.NODE_ENV === 'development',
    dryRun: process.env.ENV === 'localhost',
};

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

const csp = async () => {
    const prodHost = 'nav.no';
    const prodWithSubdomains = `*.${prodHost}`;

    const appHost = new URL(process.env.APP_ORIGIN).host;
    const adminHost = new URL(process.env.ADMIN_ORIGIN).host;
    const xpHost = new URL(process.env.XP_ORIGIN).host;

    const qbrickHost = 'video.qbrick.com';
    const salesforceVideoHost = 'ihb.nav.no';

    // These are used by a NAV-funded research project for accessibility-related feedback
    const tingtunHost = '*.tingtun.no';
    const termerHost = 'termer.no';
    const tiTiHosts = [tingtunHost, termerHost];

    const uxSignalsScriptHost = 'uxsignals-frontend.uxsignals.app.iterate.no';
    const uxSignalsApiHost = 'api.uxsignals.com';

    // Filter duplicates, as some origins may be identical, depending on
    // deployment environment
    const internalHosts = [
        prodWithSubdomains,
        ...[appHost, adminHost, xpHost].filter(
            (origin, index, array) =>
                !origin.endsWith(prodHost) && array.indexOf(origin) === index
        ),
    ];

    const envMap = {
        localhost: 'localhost',
        dev1: 'dev',
        dev2: 'beta',
        prod: 'prod',
    };

    const scriptSrc = [...internalHosts, ...tiTiHosts, uxSignalsScriptHost];

    const directives = {
        'default-src': internalHosts,
        'script-src-elem': scriptSrc,
        'script-src': scriptSrc,
        'worker-src': internalHosts,
        'style-src': [...internalHosts, UNSAFE_INLINE],
        'font-src': [...internalHosts, DATA],
        'img-src': [...internalHosts, DATA],
        'frame-src': [qbrickHost],
        'connect-src': [...internalHosts, uxSignalsApiHost],
        'media-src': [salesforceVideoHost],
    };

    if (process.env.NODE_ENV === 'development') {
        directives['default-src'].push('ws:');
        directives['connect-src'].push('ws:');
        directives['script-src'].push(UNSAFE_INLINE, UNSAFE_EVAL);
    }

    return buildCspHeader(directives, {
        env: envMap[process.env.ENV],
        localUrl: process.env.DECORATOR_URL,
    });
};

const isFailover = process.env.IS_FAILOVER_INSTANCE === 'true';
const isLocal = process.env.ENV === 'localhost';

const corsHeaders = [
    {
        key: 'Access-Control-Allow-Origin',
        value: isFailover ? process.env.APP_ORIGIN : process.env.ADMIN_ORIGIN,
    },
];

console.log(
    `Env: ${process.env.ENV} - Node env: ${process.env.NODE_ENV} - Failover: ${isFailover}`
);

const config = {
    productionBrowserSourceMaps: true,
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
        SENTRY_DSN: process.env.SENTRY_DSN,
        NAVNO_API_URL: process.env.NAVNO_API_URL,
        DECORATOR_URL: process.env.DECORATOR_URL,
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
        // Redirects from an old invalid link which must be resolved for the time being
        {
            source: '/no/nav-og-samfunn/samarbeid/for-kommunen/digisos/til-kommuner-som-onsker-a-ta-i-bruk-digital-soknad-om-okonomisk-sosialhjelp/_/attachment/download/ec690be3-b949-4945-9e73-e7fd7437fc94(:)91ebdeaf85cd092e2c96f4ecc82d5bf88b1838b3/handbok-for-innforing-av-digital-soknad---oppdatert-25.05.2020.pdf',
            destination: `${process.env.APP_ORIGIN}/no/nav-og-samfunn/samarbeid/for-kommunen/digisos/til-kommuner-som-onsker-a-ta-i-bruk-digital-soknad-om-okonomisk-sosialhjelp/Håndbok for innføring av digital søknad %2800B%29 12.12.19.pdf`,
            permanent: false,
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
        // Send some very common invalid requests directly to 404
        // to prevent unnecessary spam in our error logs
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
            headers: corsHeaders,
        },
        {
            source: '/api/jsonCache',
            headers: corsHeaders,
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
                    value: await csp(),
                },
            ],
        },
    ],
    sentry: {
        autoInstrumentServerFunctions: false,
        hideSourceMaps: true,
    },
};

module.exports = withSentryConfig(withBundleAnalyzer(config), sentryConfig);
