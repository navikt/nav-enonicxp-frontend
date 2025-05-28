import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Set cache control for static assets (svg, png, ico, webmanifest)
    const staticAssetExtensions = /\.(svg|png|ico|webmanifest)$/;
    if (staticAssetExtensions.test(request.nextUrl.pathname)) {
        response.headers.set('Cache-Control', 'public,max-age=86400');
    }

    // Set the app-name header for all requests
    response.headers.set('app-name', 'nav-enonicxp-frontend');

    return response;
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        // Match all request paths except for the ones starting with:
        // - api (API routes)
        // - _next/static (static files - handled by Next.js)
        // - _next/image (image optimization files)
        // But include static assets that need cache headers
        '/((?!api|_next/static|_next/image).*)',
    ],
};
