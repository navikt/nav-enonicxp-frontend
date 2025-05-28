import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const pathname = request.nextUrl.pathname;

    // Handle static assets (svg, png, ico, webmanifest)
    if (pathname.match(/\.(svg|png|ico|webmanifest)$/)) {
        response.headers.set('Cache-Control', 'public,max-age=86400');
    }

    // Set the app-name header for all requests
    response.headers.set('app-name', 'nav-enonicxp-frontend');

    return response;
}

// Configure which paths the middleware should run on
// Keep current exclusion pattern for optimal performance
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
