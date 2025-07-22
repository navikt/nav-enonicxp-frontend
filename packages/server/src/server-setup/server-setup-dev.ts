import { Express } from 'express';
import { InferredNextWrapperServer } from 'server';

// Note: X-Robots-Tag header and domain redirects have been moved to Next.js middleware
// This setup now only handles Express-specific dev functionality if needed
export const serverSetupDev = (expressApp: Express, nextApp: InferredNextWrapperServer) => {
    const nextRequestHandler = nextApp.getRequestHandler();

    // Handle specific paths that need Express processing (if any)
    // Most functionality has been moved to Next.js middleware

    // Keep API routes handling in Express for now if needed
    console.log('[DEV SETUP] Setting up /api/internal/* route...');
    try {
        // Use explicit parameter pattern instead of /*
        expressApp.all('/api/internal/:path(*)', (req, res, next) => {
            console.log(`[DEV SETUP] Handling ${req.method} ${req.url} in Express dev setup`);
            return nextRequestHandler(req, res);
        });
        console.log('[DEV SETUP] /api/internal/* route setup completed');
    } catch (error) {
        console.error('[DEV SETUP] Error setting up /api/internal/* route:', error);
        throw error;
    }
};
