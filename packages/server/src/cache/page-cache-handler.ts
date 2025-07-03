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

        const fromLocalCache = localCache.get(key);
        if (fromLocalCache) {
            logger.info(`Cache hit for key: ${key} in local cache`);
            return fromLocalCache;
        }

        const fromRedisCache = await redisCache.getRender(key);
        if (!fromRedisCache) {
            return null;
        }
        logger.info(`Cache hit for key: ${key} in Redis cache`);

        localCache.set(key, fromRedisCache);

        return fromRedisCache;
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
