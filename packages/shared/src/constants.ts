export const TIME_24_HOURS_IN_MS = 3600 * 24 * 1000;
export const TIME_72_HOURS_IN_MS = 3600 * 72 * 1000;

// Enonic XP paths that should be redirected to the XP backend
// Root paths (without file path) are blocked by path validation middleware
export const XP_PATHS = [
    '/_/image/',
    '/_/attachment/',
    '/_/service/',
    '/_/component/',
];
