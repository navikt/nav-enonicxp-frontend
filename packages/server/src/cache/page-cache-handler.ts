import FileSystemCache from 'next/dist/server/lib/incremental-cache/file-system-cache';
import { LRUCache } from 'lru-cache';
import { CacheHandlerValue } from 'next/dist/server/lib/incremental-cache';
import { RedisCache } from '@/shared/redis_local';
import { pathToCacheKey } from '@/shared/cache-key';
import { logger } from '@/shared/logger';

export const redisCache = new RedisCache();

const localCache = new LRUCache<string, CacheHandlerValue>({
    max: 2000,
});

export default class PageCacheHandler {
    public async get(...args: Parameters<FileSystemCache['get']>) {
        const [key] = args;

        try {
            const cacheStartTime = Date.now();
            const fromLocalCache = localCache.get(key);
            const cacheLoadDuration = Date.now() - cacheStartTime;

            if (cacheLoadDuration > 1000) {
                logger.warn(`Local cache: json load takes more than 1 second for ${key}`);
            }

            if (fromLocalCache) {
                return fromLocalCache;
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
