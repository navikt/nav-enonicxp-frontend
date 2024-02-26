import { createClient, RedisClientOptions } from 'redis';
import { logger } from 'srcCommon/logger';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import { TIME_24_HOURS_IN_MS, TIME_72_HOURS_IN_MS } from 'srcCommon/constants';
import { CacheHandlerValue } from 'next/dist/server/lib/incremental-cache';
import { pathToCacheKey } from 'srcCommon/cache-key';

// TODO: share XP response props with next-app for a proper type here
type XpResponseProps = Record<string, any>;

const clientOptions: RedisClientOptions = {
    url: process.env.REDIS_URI_PAGECACHE,
    username: process.env.REDIS_USERNAME_PAGECACHE,
    password: process.env.REDIS_PASSWORD_PAGECACHE,
    socket: { keepAlive: 5000, connectTimeout: 10000 },
} as const;

const validateClientOptions = () => {
    const isValid = !!(
        clientOptions.url &&
        clientOptions.username &&
        clientOptions.password
    );

    if (!isValid) {
        logger.error(`Client options for Redis has missing parameters!`);
    }

    return isValid;
};

class RedisCacheImpl {
    private readonly client: ReturnType<typeof createClient>;

    private readonly responseCacheTTL: number = TIME_72_HOURS_IN_MS;
    private readonly renderCacheTTL: number = TIME_24_HOURS_IN_MS;

    private readonly responseCacheKeyPrefix = getResponseCacheKeyPrefix();
    private renderCacheKeyPrefix = '';

    constructor() {
        this.client = createClient(clientOptions)
            .on('connect', () => {
                logger.info('Redis client connected');
            })
            .on('ready', () => {
                logger.info('Redis client ready');
            })
            .on('end', () => {
                logger.info('Redis client connection closed');
            })
            .on('reconnecting', () => {
                logger.info('Redis client reconnecting');
            })
            .on('error', (err) => {
                logger.error(`Redis client error: ${err}`);
            });
    }

    public async init(buildId: string) {
        this.renderCacheKeyPrefix = getRenderCacheKeyPrefix(buildId);

        return this.client.connect().then(() => {
            logger.info(
                `Initialized redis client with url ${clientOptions.url} - Render key prefix: ${this.renderCacheKeyPrefix} - Response key prefix: ${this.responseCacheKeyPrefix}`
            );
            return this;
        });
    }

    public async getRender(key: string) {
        return this.client
            .getEx(this.getFullKey(key, this.renderCacheKeyPrefix), {
                PX: this.renderCacheTTL,
            })
            .then((result) => (result ? JSON.parse(result) : result))
            .catch((e) => {
                logger.error(
                    `Error getting render cache value for key ${key} - ${e}`
                );
                return Promise.resolve(null);
            });
    }

    public async getResponse(key: string) {
        return this.client
            .get(this.getFullKey(key, this.responseCacheKeyPrefix))
            .then((result) => (result ? JSON.parse(result) : result))
            .catch((e) => {
                logger.error(`Error getting value for key ${key} - ${e}`);
                return Promise.resolve(null);
            });
    }

    private async set<DataType>(key: string, ttl: number, data: DataType) {
        return this.client
            .set(key, JSON.stringify(data), {
                PX: ttl,
            })
            .then((result) => {
                logger.info(`Redis set result for ${key}: ${result}`);
                return result;
            })
            .catch((e) => {
                logger.error(`Error setting value for key ${key} - ${e}`);
                return Promise.resolve(null);
            });
    }

    public async setRender(key: string, data: CacheHandlerValue) {
        return this.set(
            this.getFullKey(key, this.renderCacheKeyPrefix),
            this.renderCacheTTL,
            data
        );
    }

    public async setResponse(key: string, data: XpResponseProps) {
        return this.set(
            this.getFullKey(key, this.responseCacheKeyPrefix),
            this.responseCacheTTL,
            data
        );
    }

    private getFullKey(key: string, keyPrefix: string) {
        return `${keyPrefix}:${pathToCacheKey(key)}`;
    }
}

class RedisCacheDummy extends RedisCacheImpl {
    public async init() {
        return this;
    }

    public async getRender(key: string) {
        return null;
    }

    public async getResponse(key: string) {
        return null;
    }

    public async setRender(key: string, data: CacheHandlerValue) {
        return null;
    }

    public async setResponse(key: string, data: XpResponseProps) {
        return null;
    }
}

export const RedisCache =
    process.env.NODE_ENV !== 'development' &&
    process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD &&
    validateClientOptions()
        ? RedisCacheImpl
        : RedisCacheDummy;

export const getRenderCacheKeyPrefix = (buildId: string) =>
    `${process.env.ENV}:render:${buildId}`;

export const getResponseCacheKeyPrefix = () => `${process.env.ENV}:xp-response`;
