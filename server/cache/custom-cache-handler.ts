import FileSystemCache from 'next/dist/server/lib/incremental-cache/file-system-cache';
import { LRUCache } from 'lru-cache';
import { CacheHandlerValue } from 'next/dist/server/lib/incremental-cache';
import { nodeFs } from 'next/dist/server/lib/node-fs-methods';
import { RedisCache } from './redis';

type FileSystemCacheContext = ConstructorParameters<typeof FileSystemCache>[0];

const CACHE_TTL_24_HOURS = 3600 * 24 * 1000;

export const redisCache = new RedisCache({ ttl: CACHE_TTL_24_HOURS });

const localCache = new LRUCache<string, CacheHandlerValue>({
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

export default class CustomFileSystemCache extends FileSystemCache {
    constructor(ctx?: Partial<FileSystemCacheContext>) {
        const context = { ...fileSystemCacheContextDefault, ...ctx };
        super(context);
    }

    public async get(...args: Parameters<FileSystemCache['get']>) {
        const [key] = args;

        const foundData = await redisCache.get(key);

        if (!foundData?.value) {
            return null;
        }

        return foundData;

        // const dataFromMemoryCache = isrMemoryCache.get(key);
        // if (dataFromMemoryCache) {
        //     return dataFromMemoryCache;
        // }
        //
        // const dataFromFileSystemCache = await super.get(...args);
        // if (dataFromFileSystemCache) {
        //     const ttlRemaining = dataFromFileSystemCache.lastModified
        //         ? dataFromFileSystemCache.lastModified +
        //           CACHE_TTL_24_HOURS -
        //           Date.now()
        //         : CACHE_TTL_24_HOURS;
        //
        //     if (ttlRemaining > 1000) {
        //         isrMemoryCache.set(key, dataFromFileSystemCache, {
        //             ttl: ttlRemaining,
        //         });
        //     }
        // }
        //
        // return dataFromFileSystemCache;
    }

    public async set(...args: Parameters<FileSystemCache['set']>) {
        const [key, data] = args;

        const cacheItem: CacheHandlerValue = {
            value: data,
            lastModified: Date.now(),
        };

        redisCache
            .set(key, cacheItem)
            .then((result) => console.log(`Set key ${key} result`, result));

        // isrMemoryCache.set(key, { value: data, lastModified: Date.now() });
        // return super.set(...args);
    }

    public async clearGlobalCache() {
        localCache.clear();
        redisCache.clear();
        return true;
    }

    public async deleteGlobalCacheEntry(path: string) {
        const pagePath = path === '/' ? '/index' : path;
        localCache.delete(pagePath);
        redisCache.delete(pagePath);
        return true;
    }
}
