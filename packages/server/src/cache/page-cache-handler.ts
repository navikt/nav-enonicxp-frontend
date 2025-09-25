import FileSystemCache from 'next/dist/server/lib/incremental-cache/file-system-cache';
import { LRUCache } from 'lru-cache';
import { performance } from 'node:perf_hooks';
import { CacheHandlerValue } from 'next/dist/server/lib/incremental-cache';
import { RedisCache } from '@/shared/redis_local';
import { pathToCacheKey } from '@/shared/cache-key';
import { logger } from '@/shared/logger';

export const redisCache = new RedisCache();

const localCache = new LRUCache<string, CacheHandlerValue>({
    max: 2000,
});

function isCacheEntryValid(v: unknown): v is CacheHandlerValue {
    return (
        typeof v === 'object' &&
        v !== null &&
        'value' in (v as Record<string, unknown>) &&
        'lastModified' in (v as Record<string, unknown>)
    );
}

export default class PageCacheHandler {
    public async get(...args: Parameters<FileSystemCache['get']>) {
        const [key] = args;

        try {
            const cacheStartTime = performance.now();
            const fromLocalCache = localCache.get(key);
            const cacheLoadDuration = performance.now() - cacheStartTime;

            if (cacheLoadDuration > 50) {
                logger.warn(`Local cache: json load takes more than 50 ms for ${key}`);
            }

            if (fromLocalCache && isCacheEntryValid(fromLocalCache)) {
                return fromLocalCache;
            }

            if (!isCacheEntryValid(fromLocalCache)) {
                localCache.delete(key);
                logger.warn(`Local cache: invalid cache entry. Entry deleted for ${key}.`);
            }

            const fromRedisCache = await redisCache.getRender(key);
            if (!fromRedisCache) {
                return null;
            }

            localCache.set(key, fromRedisCache);

            return fromRedisCache;
        } catch (error) {
            logger.error(`Error getting cache for key ${key}:`, error);
            return null;
        }
    }

    public async set(...args: Parameters<FileSystemCache['set']>) {
        const [key, data] = args;

        const cacheItem: CacheHandlerValue = {
            value: data,
            lastModified: Date.now(),
        };

        localCache.set(key, cacheItem);
        redisCache.setRender(key, cacheItem);
    }

    public async clear() {
        logger.info('Clearing local cache!');
        localCache.clear();
    }

    public async delete(path: string) {
        const key = pathToCacheKey(path);
        logger.info(`Deleting local cache entry for ${key}`);
        localCache.delete(key);
    }
}
