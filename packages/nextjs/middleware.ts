import { NextRequest, NextResponse } from 'next/server';

const DEV_NAIS_DOMAIN = 'ansatt.dev.nav.no';
const APP_ORIGIN = process.env.APP_ORIGIN;

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const response = NextResponse.next();

    // Set X-Robots-Tag header for non-production environments
    if (process.env.ENV === 'dev1' || process.env.ENV === 'dev2') {
        response.headers.set('X-Robots-Tag', 'noindex');
    }

    // Handle build ID validation for /_next/data/ paths
    if (url.pathname.startsWith('/_next/data/') && url.pathname.endsWith('.json')) {
        const pathSegments = url.pathname.split('/');
        const buildId = pathSegments[3]; // /_next/data/[buildId]/...

        // Get the current build ID from environment or build context
        // Note: This will need to be set during build time or server startup
        const currentBuildId = process.env.NEXT_BUILD_ID;

        if (currentBuildId && buildId !== currentBuildId) {
            // console.error(`Expected build-id ${currentBuildId}, got ${buildId} on ${url.pathname}`);

            // Rewrite the URL with the correct build ID
            const correctedPath = url.pathname.replace(`/${buildId}/`, `/${currentBuildId}/`);
            url.pathname = correctedPath;

            return NextResponse.rewrite(url);
        }

        // Set no-cache headers for JSON files from incremental cache
        response.headers.set('Cache-Control', 'no-cache');
    }

    // Handle domain redirects for dev environments
    if (
        (process.env.ENV === 'dev1' || process.env.ENV === 'dev2') &&
        APP_ORIGIN &&
        APP_ORIGIN.endsWith(DEV_NAIS_DOMAIN)
    ) {
        const hostname = request.headers.get('host') || '';

        // Skip redirects for specific paths that should never redirect
        const skipRedirectPaths = [
            '/render-from-props',
            '/draft/',
            '/archive/',
            '/editor/',
            '/gfx/',
            '/api/',
            '/_/',
        ];

        const shouldSkipRedirect = skipRedirectPaths.some((path) => url.pathname.startsWith(path));

        if (!shouldSkipRedirect && !hostname.endsWith(DEV_NAIS_DOMAIN)) {
            const redirectUrl = new URL(`${APP_ORIGIN}${url.pathname}${url.search}`);
            return NextResponse.redirect(redirectUrl, 302);
        }
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Include API routes and data fetching paths
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
