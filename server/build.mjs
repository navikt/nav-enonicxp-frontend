import { build } from 'esbuild';

const commonOptions = {
    bundle: true,
    packages: 'external',
    platform: 'node',
};

// This needs to have its own bundle, at it is imported both from our custom server and the next.js server
const buildCacheHandler = () => build({
    ...commonOptions,
    entryPoints: ['src/cache/custom-cache-handler.ts'],
    outfile: '.dist/custom-cache-handler.cjs',
});

const buildServer = () => build({
    ...commonOptions,
    entryPoints: ['src/server.ts'],
    outfile: '.dist/server.cjs',
    // Externalize the cache-handler to ensure our server and next.js both import the same file
    external: ['./custom-cache-handler.cjs'],
    // Rewrite the import path for the cache handler
    alias: {
        'cache/custom-cache-handler': './custom-cache-handler.cjs'
    },
});

await Promise.all([buildCacheHandler(), buildServer()]);
