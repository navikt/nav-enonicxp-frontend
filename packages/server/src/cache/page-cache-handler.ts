import FileSystemCache from 'next/dist/server/lib/incremental-cache/file-system-cache';
import { LRUCache } from 'lru-cache';
import { performance } from 'node:perf_hooks';
import { CacheHandlerValue } from 'next/dist/server/lib/incremental-cache';
import { RedisCache } from '@/shared/redis_local';
import { pathToCacheKey } from '@/shared/cache-key';
import { logger } from '@/shared/logger';
import {
    pageCacheErrorsCounter,
    pageCacheOperationsCounter,
} from '@/shared/metrics/page-cache-metrics';

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
                logger.warn(`Local cache: json load takes more than 50 ms for key ${key}`, {
                    metaData: { cacheLoadDuration },
                });
            }

            if (fromLocalCache && isCacheEntryValid(fromLocalCache)) {
                pageCacheOperationsCounter.inc({
                    operation: 'get',
                    layer: 'render',
                    source: 'next',
                });
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
                // Full render miss (LRU + Valkey render cache both empty).
                // Next will regenerate in fetch-content.ts
                pageCacheOperationsCounter.inc({
                    operation: 'get',
                    layer: 'render',
                    source: 'miss',
                });
                return null;
            }

            pageCacheOperationsCounter.inc({
                operation: 'get',
                layer: 'render',
                source: 'valkey',
            });
            localCache.set(key, fromRedisCache);

            return fromRedisCache;
        } catch (error: any) {
            logger.error(`Error getting cache for key ${key}`, { error });
            pageCacheErrorsCounter.inc({ operation: 'get', layer: 'render', reason: 'error' });
            return null;
        }
    }

    public async set(...args: Parameters<FileSystemCache['set']>) {
        const [key, data] = args;

        const cacheItem: CacheHandlerValue = {
            value: data,
            lastModified: Date.now(),
        };

        // A set writes through to both tiers, so count both. Previously only 'next' was counted,
        // which made the Valkey render cache look write-only from the metrics' point of view.
        pageCacheOperationsCounter.inc({ operation: 'set', layer: 'render', source: 'next' });
        localCache.set(key, cacheItem);

        pageCacheOperationsCounter.inc({ operation: 'set', layer: 'render', source: 'valkey' });
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
