import FileSystemCache from 'next/dist/server/lib/incremental-cache/file-system-cache';
import { LRUCache } from 'lru-cache';
import { CacheHandlerValue } from 'next/dist/server/lib/incremental-cache';
import { RedisCache } from 'srcCommon/redis';
import { isLeaderPod } from 'leader-pod';
import { CACHE_TTL_24_HOURS_IN_MS } from 'srcCommon/constants';
import { pathToCacheKey } from 'srcCommon/cache-key';

const TTL_RESOLUTION_MS = 60 * 1000;

export const redisCache = new RedisCache();

const localCache = new LRUCache<string, CacheHandlerValue>({
    max: 2000,
    ttl: CACHE_TTL_24_HOURS_IN_MS,
    ttlResolution: TTL_RESOLUTION_MS,
});

export default class PageCacheHandler {
    public async get(...args: Parameters<FileSystemCache['get']>) {
        const [key] = args;

        const fromLocalCache = localCache.get(key);
        if (fromLocalCache) {
            return fromLocalCache;
        }

        const fromRedisCache = await redisCache.getRender(key);
        if (!fromRedisCache) {
            return null;
        }

        const ttlRemaining = fromRedisCache.lastModified
            ? fromRedisCache.lastModified +
              CACHE_TTL_24_HOURS_IN_MS -
              Date.now()
            : CACHE_TTL_24_HOURS_IN_MS;

        if (ttlRemaining > TTL_RESOLUTION_MS) {
            localCache.set(key, fromRedisCache, {
                ttl: ttlRemaining,
            });
        }

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
        localCache.clear();

        if (await isLeaderPod()) {
            return redisCache.clear();
        }
    }

    public async delete(path: string) {
        localCache.delete(pathToCacheKey(path));

        if (await isLeaderPod()) {
            return redisCache.delete(path);
        }
    }
}
