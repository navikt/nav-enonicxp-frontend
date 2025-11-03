import { RequestHandler } from 'express';
import { logger } from '@/shared/logger';

interface RateLimitEntry {
    count: number;
    firstRequest: number;
    blocked: boolean;
}

class RateLimiter {
    private requests: Map<string, RateLimitEntry> = new Map();
    private cleanupInterval: NodeJS.Timeout;

    constructor(
        private windowMs: number = 60000, // 1 minute window
        private maxRequests: number = 100, // max requests per window
        private blockDuration: number = 300000 // 5 minute block
    ) {
        // Cleanup old entries every minute
        this.cleanupInterval = setInterval(() => this.cleanup(), 60000);
    }

    private cleanup() {
        const now = Date.now();
        for (const [ip, entry] of this.requests.entries()) {
            if (now - entry.firstRequest > this.windowMs && !entry.blocked) {
                this.requests.delete(ip);
            }
            // Unblock after block duration
            if (entry.blocked && now - entry.firstRequest > this.blockDuration) {
                this.requests.delete(ip);
            }
        }
    }

    check(ip: string): { allowed: boolean; remaining: number } {
        const now = Date.now();
        const entry = this.requests.get(ip);

        if (!entry) {
            this.requests.set(ip, {
                count: 1,
                firstRequest: now,
                blocked: false,
            });
            return { allowed: true, remaining: this.maxRequests - 1 };
        }

        // If blocked, deny
        if (entry.blocked) {
            return { allowed: false, remaining: 0 };
        }

        // If window has expired, reset
        if (now - entry.firstRequest > this.windowMs) {
            entry.count = 1;
            entry.firstRequest = now;
            return { allowed: true, remaining: this.maxRequests - 1 };
        }

        // Increment count
        entry.count++;

        // Check if limit exceeded
        if (entry.count > this.maxRequests) {
            entry.blocked = true;
            logger.warn(`Rate limit exceeded for IP ${ip}. Blocking for ${this.blockDuration / 1000}s`);
            return { allowed: false, remaining: 0 };
        }

        return { allowed: true, remaining: this.maxRequests - entry.count };
    }

    destroy() {
        clearInterval(this.cleanupInterval);
    }
}

// Create separate rate limiters for different scenarios
const globalLimiter = new RateLimiter(60000, 100, 300000); // 100 req/min globally
const strictLimiter = new RateLimiter(60000, 20, 600000); // 20 req/min for suspicious activity

export const rateLimitMiddleware: RequestHandler = (req, res, next) => {
    // Skip rate limiting in development mode
    const isDev = process.env.NODE_ENV === 'development' || process.env.ENV === 'localhost';

    if (isDev) {
        return next();
    }

    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
               req.socket.remoteAddress ||
               'unknown';

    // Use strict limiter for suspicious paths
    const suspiciousPaths = ['/api/', '/admin', '/.env', '/wp-admin', '/phpMyAdmin'];
    const issuspicious = suspiciousPaths.some(path => req.path.toLowerCase().includes(path.toLowerCase()));

    const limiter = issuspicious ? strictLimiter : globalLimiter;
    const { allowed, remaining } = limiter.check(ip);

    // Add rate limit headers
    res.setHeader('X-RateLimit-Limit', issuspicious ? '20' : '100');
    res.setHeader('X-RateLimit-Remaining', remaining.toString());

    if (!allowed) {
        logger.warn(`Rate limit blocked request from ${ip} to ${req.path}`);
        return res.status(429).json({
            error: 'Too Many Requests',
            message: 'You have exceeded the rate limit. Please try again later.',
        });
    }

    next();
};

// Export for cleanup on server shutdown
export const cleanupRateLimiters = () => {
    globalLimiter.destroy();
    strictLimiter.destroy();
};
