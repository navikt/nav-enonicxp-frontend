import { RequestHandler } from 'express';
import { logger } from '@/shared/logger';
import { XP_PATHS } from '@/shared/constants';
import { InferredNextWrapperServer } from 'server';

// Common injection patterns to block
const MALICIOUS_PATTERNS = [
    // SQL Injection patterns
    /* TODO: Fiks -- problemet fra frontend og gjeninnfør disse
    /(%27)|'|(--)|(%23)|#/i,
    /((%3D)|(=))[^\n]*((%27)|'|(--)|(%3B)|;)/i,
    */
    /\w*((%27)|')((%6F)|o|(%4F))((%72)|r|(%52))/i,
    // XSS patterns
    /((%3C)|<)((%2F)|\/)*[a-z0-9%]+((%3E)|>)/i,
    /((%3C)|<)((%69)|i|(%49))((%6D)|m|(%4D))((%67)|g|(%47))[^\n]+((%3E)|>)/i,
    /((%3C)|<)[^\n]+((%3E)|>)/i,
    // Command injection patterns
    /;|\||`|\$\(|&&/,
    // Path traversal
    /\.\.+[/\\]/,
    // Null bytes
    /\0|%00/,
    // Common attack vectors
    /union.*select/i,
    /base64_decode/i,
    /eval\(/i,
    /exec\(/i,
    /system\(/i,
    /phpinfo/i,
    /\/etc\/passwd/i,
    /\/proc\/self/i,
    // Shell command injection (command at path start followed by space/colon)
    /^\/(wget|curl|bash|sh|cmd|powershell)(\s|:)/i,
];

// Common malicious file extensions to block
const BLOCKED_EXTENSIONS = [
    '.php', '.asp', '.aspx', '.jsp', '.cgi', '.pl', '.py', '.rb', '.sh',
    '.exe', '.dll', '.bat', '.cmd', '.vbs', '.ps1', '.ini'
];

// Generate blocked root paths from XP_PATHS (without trailing slash and with trailing slash)
const BLOCKED_ROOT_PATHS = new Set(XP_PATHS.flatMap(path => [
    path.slice(0, -1), // Remove trailing slash: /_/image/ -> /_/image
    path,              // Keep with trailing slash: /_/image/
]));

export const buildPathValidationMiddleware = (nextApp: InferredNextWrapperServer): RequestHandler => (req, res, next) => {
    const fullPath = req.path;
    const badRequest = () => {
        res.statusCode = 400;
        req.headers['x-nav-blocked-path'] = "true";
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                nextApp.renderError(null, req, res, fullPath).then(resolve);
            }, 1000 + Math.random() * 2000);
        });
    };

    // Check for excessively long paths early (prevents wasting CPU on regex for huge strings)
    if (fullPath.length > 1000) {
        logger.warn(`Blocked excessively long path: ${req.method} ${fullPath.substring(0, 100)}... from ${req.ip}`);
        return badRequest();
    }

    let decodedPath: string;
    try {
        decodedPath = decodeURIComponent(fullPath);
    } catch {
        // Malformed URI - treat as suspicious
        logger.warn(`Blocked malformed URI: ${req.method} ${fullPath} from ${req.ip}`);
        return badRequest();
    }

    // Block direct access to Enonic XP root paths
    if (BLOCKED_ROOT_PATHS.has(fullPath) || BLOCKED_ROOT_PATHS.has(decodedPath)) {
        logger.warn(`Blocked root XP path access: ${req.method} ${fullPath} from ${req.ip}`);
        return badRequest();
    }

    // Check for /_/ - Only valid at the beginning
    const posXPprefix = req.path.search('/_/');
    if (posXPprefix === 0) {
        // Only redirect known XP paths
        const isKnownXpPath = XP_PATHS.some(xpPath => req.path.startsWith(xpPath));

        if (isKnownXpPath) {
            if (process.env.XP_ORIGIN !== process.env.APP_ORIGIN) {
                // Non-production environments only
                const xpUrl = `${process.env.XP_ORIGIN}${req.path}`;
                return res.redirect(307, xpUrl); // 307 = Temporary Redirect, preserves method
            }
            next();
        } else {
            logger.warn(`Blocked unknown XP path: ${req.method} ${req.path} from ${req.ip}`);
            return badRequest();
        }
    } else if (posXPprefix > 0) {
        logger.warn(`Blocked invalid XP path: ${req.method} ${req.path} from ${req.ip}`);
        return badRequest();
    }

    // Check for repeated patterns (potential attack)
    const repeatedPattern = /(.{10,})\1{3,}/;
    if (repeatedPattern.test(fullPath)) {
        logger.warn(`Blocked repeated pattern attack: ${req.method} ${fullPath.substring(0, 100)}... from ${req.ip}`);
        return badRequest();
    }

    // Check for excessive path segments (potential DoS)
    const segments = fullPath.split('/').filter(s => s.length > 0);
    if (segments.length > 50) {
        logger.warn(`Blocked excessive path segments: ${req.method} ${fullPath} from ${req.ip}`);
        return badRequest();
    }

    // Check for malicious patterns in the path
    for (const pattern of MALICIOUS_PATTERNS) {
        if (pattern.test(fullPath) || pattern.test(decodedPath)) {
            logger.warn(`Blocked suspicious request pattern: ${req.method} ${fullPath} from ${req.ip}`);
            return badRequest();
        }
    }

    // Check for blocked file extensions
    const hasBlockedExtension = BLOCKED_EXTENSIONS.some(ext =>
        fullPath.toLowerCase().endsWith(ext) || decodedPath.toLowerCase().endsWith(ext)
    );
    if (hasBlockedExtension) {
        logger.warn(`Blocked suspicious file extension: ${req.method} ${fullPath} from ${req.ip}`);
        return badRequest();
    }

    next();
};
