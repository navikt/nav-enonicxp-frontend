const rewrites = [
    {
        source: '/test',
        destination: '/no/bedrift',
    },
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
    // /_/* should point to XP services. Rewrite only if XP is on a different origin
    ...(process.env.XP_ORIGIN !== process.env.APP_ORIGIN
        ? [
              {
                  source: '/_/:path*',
                  destination: `${process.env.XP_ORIGIN}/_/:path*`,
              },
          ]
        : []),
    ...(process.env.ENV === 'localhost'
        ? [
              {
                  source: '/admin/site/preview/default/draft/:path*',
                  destination:
                      'http://localhost:8080/admin/site/preview/default/draft/:path*',
              },
          ]
        : []),
];

const setupRewrites = (server, nextRequestHandler) => {
    rewrites.forEach((rewrite) => {
        server.get(rewrite.source, (req, res) => {
            req.url = rewrite.destination;
            return nextRequestHandler(req, res);
        });
    });
};

module.exports = {
    setupRewrites,
};
