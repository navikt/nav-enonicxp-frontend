import { Express } from 'express';
import { InferredNextWrapperServer } from 'server';

// Note: X-Robots-Tag header and domain redirects have been moved to Next.js middleware
// This setup now only handles Express-specific dev functionality if needed
export const serverSetupDev = (expressApp: Express, nextApp: InferredNextWrapperServer) => {
    const nextRequestHandler = nextApp.getRequestHandler();

    // Handle specific paths that need Express processing (if any)
    // Most functionality has been moved to Next.js middleware

    // Keep API routes handling in Express for now if needed
    expressApp.all('/api/internal/*', (req, res, next) => {
        return nextRequestHandler(req, res);
    });
};
