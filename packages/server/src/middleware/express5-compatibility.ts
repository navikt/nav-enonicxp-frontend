import { RequestHandler } from 'express';
import { IncomingMessage } from 'http';

/**
 * Express 5 Compatibility Middleware
 *
 * Express 5 introduces a breaking change where the request object becomes locked,
 * preventing modifications to properties like `query`. This middleware creates a
 * mutable clone of the request object properties to maintain compatibility.
 *
 * Related issue: https://github.com/vercel/next.js/issues/79158
 *
 * Consider removing this middleware once Next.js fully supports Express 5.
 */
export const express5CompatibilityMiddleware: RequestHandler = (req, res, next) => {
    // Create a descriptor for the query property that makes it writable
    const originalQuery = req.query;

    try {
        // Delete the existing query property and recreate it as writable
        delete (req as any).query;

        // Define query as a writable property
        Object.defineProperty(req, 'query', {
            value: originalQuery,
            writable: true,
            enumerable: true,
            configurable: true,
        });

        // Also ensure other commonly modified properties are writable
        const originalBody = req.body;
        delete (req as any).body;
        Object.defineProperty(req, 'body', {
            value: originalBody,
            writable: true,
            enumerable: true,
            configurable: true,
        });

        // Make the params property writable if it exists
        if (req.params) {
            const originalParams = req.params;
            delete (req as any).params;
            Object.defineProperty(req, 'params', {
                value: originalParams,
                writable: true,
                enumerable: true,
                configurable: true,
            });
        }
    } catch (error) {
        // If the above approach fails, try a more aggressive approach
        // by creating a new request-like object that inherits from IncomingMessage
        const originalReq = req;

        // Create a new object that has all the properties of the original request
        const mutableReq = Object.create(IncomingMessage.prototype);

        // Copy all enumerable properties
        Object.keys(originalReq).forEach((key) => {
            try {
                (mutableReq as any)[key] = (originalReq as any)[key];
            } catch (e) {
                // Ignore properties that can't be copied
            }
        });

        // Copy all non-enumerable properties that are commonly used
        const nonEnumerableProps = [
            'query',
            'body',
            'params',
            'url',
            'method',
            'headers',
            'originalUrl',
            'path',
            'hostname',
            'ip',
            'ips',
            'protocol',
            'secure',
            'xhr',
            'route',
            'cookies',
            'signedCookies',
            'fresh',
            'stale',
            'baseUrl',
            'app',
            'res',
        ];

        nonEnumerableProps.forEach((prop) => {
            try {
                const descriptor = Object.getOwnPropertyDescriptor(originalReq, prop);
                if (descriptor) {
                    Object.defineProperty(mutableReq, prop, {
                        ...descriptor,
                        writable: true,
                        configurable: true,
                    });
                } else if ((originalReq as any)[prop] !== undefined) {
                    (mutableReq as any)[prop] = (originalReq as any)[prop];
                }
            } catch (e) {
                // Ignore properties that can't be copied
            }
        });

        // Replace the request object reference
        Object.setPrototypeOf(req, mutableReq);
        Object.assign(req, mutableReq);
    }

    next();
};
