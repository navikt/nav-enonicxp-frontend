import { build, context } from 'esbuild';

const isWatchMode = process.env.WATCH === 'true';

const commonOptions = {
    bundle: true,
    packages: 'external',
    platform: 'node',
};

// The cache handler needs to have its own bundle, at it is imported both from our custom server and the next.js server
const cacheHandlerOptions = {
    ...commonOptions,
    entryPoints: ['src/cache/page-cache-handler.ts'],
    outfile: './.dist/page-cache-handler.cjs',
};

const serverOptions = {
    ...commonOptions,
    entryPoints: ['src/server.ts'],
    outfile: './.dist/server.cjs',
    // Externalize the cache-handler to ensure our server and next.js both import the same file
    external: ['./page-cache-handler.cjs'],
    // Rewrite the import path for the cache handler
    alias: {
        'cache/page-cache-handler': './page-cache-handler.cjs',
    },
};

if (isWatchMode) {
    console.log('Building in watch mode');

    const cacheHandlerContext = await context(cacheHandlerOptions);
    const serverContext = await context(serverOptions);

    await Promise.all([cacheHandlerContext.watch(), serverContext.watch()]);
} else {
    console.log('Building in normal mode');

    await Promise.all([build(cacheHandlerOptions), build(serverOptions)]);
}
