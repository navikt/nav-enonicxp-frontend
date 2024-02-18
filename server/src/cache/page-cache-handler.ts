import FileSystemCache from 'next/dist/server/lib/incremental-cache/file-system-cache';
import { LRUCache } from 'lru-cache';
import { CacheHandlerValue } from 'next/dist/server/lib/incremental-cache';
import { RedisCache } from 'srcCommon/redis';
import { isLeaderPod } from 'leader-pod';
import {
    CACHE_TTL_24_HOURS_IN_MS,
    RESPONSE_CACHE_KEY_PREFIX,
} from 'srcCommon/constants';

const TTL_RESOLUTION_MS = 60 * 1000;

export const redisCache = new RedisCache<CacheHandlerValue>();

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

        const fromRedisCache = await redisCache.get(key);
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
        redisCache.set(key, cacheItem);
    }

    public async clear() {
        localCache.clear();

        if (await isLeaderPod()) {
            return redisCache.clear();
        }
    }

    public async delete(path: string) {
        const pagePath = path === '/' ? '/index' : path;
        localCache.delete(pagePath);

        if (await isLeaderPod()) {
            return Promise.all([
                redisCache.delete(pagePath),
                redisCache.delete(pagePath, RESPONSE_CACHE_KEY_PREFIX),
            ]);
        }
    }
}
