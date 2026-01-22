import { RequestHandler } from 'express';
import { logger } from '@/shared/logger';
import { XP_PATHS } from '@/shared/constants';

// Common injection patterns to block
const MALICIOUS_PATTERNS = [
    // SQL Injection patterns
    /(%27)|'|(--)|(%23)|#/i,
    /((%3D)|(=))[^\n]*((%27)|'|(--)|(%3B)|;)/i,
    /\w*((%27)|')((%6F)|o|(%4F))((%72)|r|(%52))/i,
    // XSS patterns
    /((%3C)|<)((%2F)|\/)*[a-z0-9%]+((%3E)|>)/i,
    /((%3C)|<)((%69)|i|(%49))((%6D)|m|(%4D))((%67)|g|(%47))[^\n]+((%3E)|>)/i,
    /((%3C)|<)[^\n]+((%3E)|>)/i,
    // Command injection patterns
    /;|\||`|\$\(|&&/,
    // Path traversal
    /\.\.[/\\]/,
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
    // Shell commands
    /\b(wget|curl|nc|netcat|bash|sh|cmd|powershell)\b/i,
];

// Common malicious file extensions to block
const BLOCKED_EXTENSIONS = [
    '.php', '.asp', '.aspx', '.jsp', '.cgi', '.pl', '.py', '.rb', '.sh',
    '.exe', '.dll', '.bat', '.cmd', '.vbs', '.ps1', '.ini'
];

// Generate blocked root paths from XP_PATHS (without trailing slash and with trailing slash)
const BLOCKED_ROOT_PATHS = XP_PATHS.flatMap(path => [
    path.slice(0, -1), // Remove trailing slash: /_/image/ -> /_/image
    path,              // Keep with trailing slash: /_/image/
]);

export const pathValidationMiddleware: RequestHandler = (req, res, next) => {
    const fullPath = req.path;
    const decodedPath = decodeURIComponent(fullPath);

    // Block direct access to Enonic XP root paths
    if (BLOCKED_ROOT_PATHS.includes(fullPath) || BLOCKED_ROOT_PATHS.includes(decodedPath)) {
        logger.warn(`Blocked root XP path access: ${req.method} ${fullPath} from ${req.ip}`);
        return res.status(403).send('Forbidden');
    }

    // Check for malicious patterns in the path
    for (const pattern of MALICIOUS_PATTERNS) {
        if (pattern.test(fullPath) || pattern.test(decodedPath)) {
            logger.warn(`Blocked suspicious request pattern: ${req.method} ${fullPath} from ${req.ip}`);
            return res.status(400).send('Bad Request');
        }
    }

    // Check for blocked file extensions
    const hasBlockedExtension = BLOCKED_EXTENSIONS.some(ext =>
        fullPath.toLowerCase().endsWith(ext) || decodedPath.toLowerCase().endsWith(ext)
    );
    if (hasBlockedExtension) {
        logger.warn(`Blocked suspicious file extension: ${req.method} ${fullPath} from ${req.ip}`);
        return res.status(400).send('Bad Request');
    }

    // Check for excessively long paths (potential DoS)
    if (fullPath.length > 2000) {
        logger.warn(`Blocked excessively long path: ${req.method} ${fullPath.substring(0, 100)}... from ${req.ip}`);
        return res.status(414).send('URI Too Long');
    }

    // Check for excessive path segments (potential DoS)
    const segments = fullPath.split('/').filter(s => s.length > 0);
    if (segments.length > 50) {
        logger.warn(`Blocked excessive path segments: ${req.method} ${fullPath} from ${req.ip}`);
        return res.status(400).send('Bad Request');
    }

    // Check for repeated patterns (potential attack)
    const repeatedPattern = /(.{10,})\1{3,}/;
    if (repeatedPattern.test(fullPath)) {
        logger.warn(`Blocked repeated pattern attack: ${req.method} ${fullPath.substring(0, 100)}... from ${req.ip}`);
        return res.status(400).send('Bad Request');
    }

    next();
};