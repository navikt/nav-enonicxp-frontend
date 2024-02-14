import FileSystemCache from 'next/dist/server/lib/incremental-cache/file-system-cache';
import { LRUCache } from 'lru-cache';
import { CacheHandlerValue } from 'next/dist/server/lib/incremental-cache';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { IncrementalCacheKindHint } from 'next/dist/server/response-cache';
import { nodeFs } from 'next/dist/server/lib/node-fs-methods';
import { logger } from 'srcCommon/logger';

// The type for this method is not exported from next.js
// Be aware it may change when updating the next.js version
type GetFilePathFunction = (
    pathname: string,
    kind: IncrementalCacheKindHint
) => string;

type FileSystemCacheContext = ConstructorParameters<typeof FileSystemCache>[0];

const CACHE_FILE_EXTENSIONS = ['html', 'json', 'meta'] as const;

const CACHE_TTL_24_HOURS = 3600 * 24 * 1000;

const isrMemoryCache = new LRUCache<string, CacheHandlerValue>({
    max: 1000,
    ttl: CACHE_TTL_24_HOURS,
    ttlResolution: 1000,
});

const fileSystemCacheContextDefault: FileSystemCacheContext = {
    fs: nodeFs,
    serverDistDir: '.',
    experimental: { ppr: false },
    revalidatedTags: [],
    _appDir: false,
    _pagesDir: true,
    _requestHeaders: {},
} as const;

const customPageCacheDir =
    process.env.IS_FAILOVER_INSTANCE !== 'true' && process.env.PAGE_CACHE_DIR;

export default class CustomFileSystemCache extends FileSystemCache {
    constructor(ctx?: Partial<FileSystemCacheContext>) {
        const context = { ...fileSystemCacheContextDefault, ...ctx };

        context.serverDistDir = customPageCacheDir || context.serverDistDir;

        super(context);
    }

    public async get(...args: Parameters<FileSystemCache['get']>) {
        const [key] = args;

        const dataFromMemoryCache = isrMemoryCache.get(key);
        if (dataFromMemoryCache) {
            return dataFromMemoryCache;
        }

        const dataFromFileSystemCache = await super.get(...args);
        if (dataFromFileSystemCache) {
            const ttlRemaining = dataFromFileSystemCache.lastModified
                ? dataFromFileSystemCache.lastModified +
                  CACHE_TTL_24_HOURS -
                  Date.now()
                : CACHE_TTL_24_HOURS;

            if (ttlRemaining > 1000) {
                isrMemoryCache.set(key, dataFromFileSystemCache, {
                    ttl: ttlRemaining,
                });
            }
        }

        return dataFromFileSystemCache;
    }

    public async set(...args: Parameters<FileSystemCache['set']>) {
        const [key, data] = args;

        isrMemoryCache.set(key, { value: data, lastModified: Date.now() });
        return super.set(...args);
    }

    public async clearGlobalCache() {
        let didClearFs;

        try {
            const filePath = this.getFilePathPublic('', 'pages');

            if (fs.existsSync(filePath)) {
                fs.rmSync(filePath, { recursive: true });
            }

            logger.info(`Wiped all cached pages from ${filePath}`);

            didClearFs = true;
        } catch (e) {
            logger.error(
                `Error occurred while wiping page-cache from disk - ${e}`
            );
            didClearFs = false;
        }

        isrMemoryCache.clear();

        return didClearFs;
    }

    public async deleteGlobalCacheEntry(path: string) {
        const pagePath = path === '/' ? '/index' : path;

        return Promise.all(
            CACHE_FILE_EXTENSIONS.map((ext) =>
                this.deletePageCacheFile(`${pagePath}.${ext}`)
            )
        )
            .catch((e) => {
                logger.error(
                    `Error occurred while invalidating page cache for path ${pagePath} - ${e}`
                );
            })
            .finally(() => isrMemoryCache.delete(pagePath));
    }

    private async deletePageCacheFile(pathname: string) {
        const filePath = this.getFilePathPublic(pathname, 'pages');

        return fsPromises
            .unlink(filePath)
            .then(() => {
                logger.info(`Removed file from page cache: ${pathname}`);
            })
            .catch((e: any) => {
                logger.info(
                    `Failed to remove file from page cache: ${pathname} - ${e}`
                );
            });
    }

    public getFilePathPublic(pathname: string, kind: IncrementalCacheKindHint) {
        return (this['getFilePath'] as GetFilePathFunction)(pathname, kind);
    }
}
