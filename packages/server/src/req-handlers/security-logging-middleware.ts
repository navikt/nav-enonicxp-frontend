import { RequestHandler } from 'express';
import { logger } from '@/shared/logger';

// Track suspicious activity patterns
const suspiciousPatterns = {
    sqlInjection: /('|(--)|;|union|select|insert|update|delete|drop|create|alter)/i,
    xss: /<script|<iframe|javascript:|onerror=|onload=/i,
    pathTraversal: /\.\./,
    commonAttacks: /(phpinfo|passwd|\/etc\/|\/proc\/|cmd=|exec)/i,
};

export const securityLoggingMiddleware: RequestHandler = (req, res, next) => {
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
               req.socket.remoteAddress ||
               'unknown';

    const userAgent = req.headers['user-agent'] || 'unknown';

    // Check for suspicious patterns
    const suspiciousFlags: string[] = [];
    const testString = `${req.path} ${JSON.stringify(req.query)} ${JSON.stringify(req.body)}`;

    for (const [category, pattern] of Object.entries(suspiciousPatterns)) {
        if (pattern.test(testString)) {
            suspiciousFlags.push(category);
        }
    }

    // Log suspicious requests with more details
    if (suspiciousFlags.length > 0) {
        logger.warn(
            `Suspicious request detected - IP: ${ip}, Method: ${req.method}, Path: ${req.path}, ` +
            `Flags: [${suspiciousFlags.join(', ')}], UserAgent: ${userAgent}`
        );
    }

    // Log requests to commonly targeted paths
    const commonTargets = [
        '/wp-admin', '/wp-login', '/.env', '/admin', '/phpMyAdmin',
        '/config', '/backup', '/.git', '/api/admin'
    ];

    if (commonTargets.some(target => req.path.toLowerCase().includes(target.toLowerCase()))) {
        logger.warn(
            `Request to commonly targeted path - IP: ${ip}, Method: ${req.method}, ` +
            `Path: ${req.path}, UserAgent: ${userAgent}`
        );
    }

    next();
};
