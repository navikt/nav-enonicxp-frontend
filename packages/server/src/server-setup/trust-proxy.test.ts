import express, { Request } from 'express';
import { configureTrustProxy } from './trust-proxy';

// Builds a request on Express' own request prototype, so req.ip is resolved exactly as at runtime.
// The socket address plays the role of the sidecar (loopback), and X-Forwarded-For says who the
// client is, just like in the cluster.
const resolveIp = (forwardedFor?: string, socketAddress = '127.0.0.1') => {
    const app = express();
    configureTrustProxy(app);

    const req = Object.create(app.request) as Request;
    Object.assign(req, {
        app,
        socket: { remoteAddress: socketAddress },
        headers: forwardedFor ? { 'x-forwarded-for': forwardedFor } : {},
    });

    return req.ip;
};

describe('Trust proxy', () => {
    test('uses the socket address when there is no X-Forwarded-For', () => {
        expect(resolveIp()).toBe('127.0.0.1');
    });

    test('uses the client address from X-Forwarded-For', () => {
        expect(resolveIp('203.0.113.1')).toBe('203.0.113.1');
    });

    test('ignores entries the client adds to X-Forwarded-For and skips internal hops', () => {
        // The client sends its own X-Forwarded-For, the ingress appends the real address,
        // and an internal hop after it is skipped
        expect(resolveIp('198.51.100.1, 203.0.113.3, 10.0.0.7')).toBe('203.0.113.3');
    });

    test('skips hops in the shared address space', () => {
        expect(resolveIp('203.0.113.4, 100.64.1.2')).toBe('203.0.113.4');
    });

    test('does not trust X-Forwarded-For from a public address', () => {
        expect(resolveIp('198.51.100.1', '203.0.113.5')).toBe('203.0.113.5');
    });
});
