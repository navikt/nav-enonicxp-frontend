import FileSystemCache from 'next/dist/server/lib/incremental-cache/file-system-cache';
import { LRUCache } from 'lru-cache';
import { performance } from 'node:perf_hooks';
import { CacheHandlerValue } from 'next/dist/server/lib/incremental-cache';
import { RedisCache } from '@/shared/redis_local';
import { pathToCacheKey } from '@/shared/cache-key';
import { logger } from '@/shared/logger';
import { pageFetchOperationsCounter } from '@/shared/request-metrics';

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

        // TODO: Remove after cache investigation
        logger.info(`PageCacheHandler.get called for key: ${key}`);

        try {
            const cacheStartTime = performance.now();
            const fromLocalCache = localCache.get(key);
            const cacheLoadDuration = performance.now() - cacheStartTime;

            if (cacheLoadDuration > 50) {
                logger.warn(`Local cache: json load takes more than 50 ms for key ${key}`, {
                    metaData: { cacheLoadDuration },
                });
            }

            if (fromLocalCache && isCacheEntryValid(fromLocalCache)) {
                pageFetchOperationsCounter.inc({ operation: 'get', source: 'next' });
                return fromLocalCache;
            }

            // There was something in the cache, but it's not valid
            if (fromLocalCache && !isCacheEntryValid(fromLocalCache)) {
                localCache.delete(key);
                logger.warn(
                    `Local cache: invalid cache entry: ${JSON.stringify(fromLocalCache)}. Entry deleted for ${key}.`
                );
            }

            const fromRedisCache = await redisCache.getRender(key);
            if (!fromRedisCache) {
                pageFetchOperationsCounter.inc({ operation: 'get', source: 'xp' });
                return null;
            }

            pageFetchOperationsCounter.inc({ operation: 'get', source: 'valkey' });
            localCache.set(key, fromRedisCache);

            return fromRedisCache;
        } catch (error: any) {
            logger.error(`Error getting cache for key ${key}`, { error });
            return null;
        }
    }

    public async set(...args: Parameters<FileSystemCache['set']>) {
        const [key, data] = args;

        // TODO: Remove after cache investigation
        logger.info(`PageCacheHandler.set called for key: ${key}`);

        const cacheItem: CacheHandlerValue = {
            value: data,
            lastModified: Date.now(),
        };

        pageFetchOperationsCounter.inc({ operation: 'set', source: 'next' });
        localCache.set(key, cacheItem);
        redisCache.setRender(key, cacheItem);
    }

    public async clear() {
        logger.info('Clearing local cache!');
        localCache.clear();
    }

    public async delete(path: string) {
        const key = pathToCacheKey(path);
        logger.info(`Deleting local cache entry for key ${key}`);
        localCache.delete(key);
    }
}
