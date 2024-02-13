import FileSystemCache from 'next/dist/server/lib/incremental-cache/file-system-cache';
import { LRUCache } from 'lru-cache';
import { CacheHandlerValue } from 'next/dist/server/lib/incremental-cache';
import { RedisCache } from './redis';
import { isLeaderPod } from '../leader';

const CACHE_TTL_24_HOURS_IN_MS = 3600 * 24 * 1000;

export const redisCache = new RedisCache({ ttl: CACHE_TTL_24_HOURS_IN_MS });

const localCache = new LRUCache<string, CacheHandlerValue>({
    max: 1000,
    ttl: CACHE_TTL_24_HOURS_IN_MS,
    ttlResolution: 1000,
});

export default class CustomCacheHandler {
    public async get(...args: Parameters<FileSystemCache['get']>) {
        const [key] = args;

        const fromLocalCache = localCache.get(key);
        if (fromLocalCache) {
            return fromLocalCache;
        }

        const fromRedisCache = await redisCache.get(key);
        if (!fromRedisCache?.value) {
            return null;
        }

        const ttlRemaining = fromRedisCache.lastModified
            ? fromRedisCache.lastModified +
              CACHE_TTL_24_HOURS_IN_MS -
              Date.now()
            : CACHE_TTL_24_HOURS_IN_MS;

        if (ttlRemaining > 1000) {
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

        localCache.set(key, { value: data, lastModified: Date.now() });

        redisCache
            .set(key, cacheItem)
            .then((result) => console.log(`Set key ${key} result`, result));
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
            return redisCache.delete(pagePath);
        }
    }
}
