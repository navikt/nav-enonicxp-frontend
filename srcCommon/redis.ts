import { createClient, RedisClientOptions } from 'redis';
import { logger } from 'srcCommon/logger';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import { CACHE_TTL_24_HOURS_IN_MS } from 'srcCommon/constants';
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

interface IRedisCache {
    init(buildId: string): Promise<IRedisCache>;

    getRender(key: string): Promise<CacheHandlerValue | null>;

    setRender(key: string, data: CacheHandlerValue): Promise<string | null>;

    getResponse(key: string): Promise<XpResponseProps | null>;

    setResponse(key: string, data: XpResponseProps): Promise<string | null>;

    delete(key: string): Promise<number>;

    clear(): Promise<string>;
}

class RedisCacheImpl implements IRedisCache {
    private readonly client: ReturnType<typeof createClient>;
    private readonly ttl: number = CACHE_TTL_24_HOURS_IN_MS;
    private readonly responseCacheKeyPrefix = `${process.env.ENV}:xp-response`;
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
        this.renderCacheKeyPrefix = `${process.env.ENV}:render:${buildId}`;

        return this.client.connect().then(() => {
            logger.info(
                `Initialized redis client with url ${clientOptions.url} - TTL: ${this.ttl} - Render prefix: ${this.renderCacheKeyPrefix} - Response prefix: ${this.responseCacheKeyPrefix}`
            );
            return this;
        });
    }

    private async get(key: string) {
        return this.client
            .get(key)
            .then((result) => (result ? JSON.parse(result) : result))
            .catch((e) => {
                logger.error(`Error getting value for key ${key} - ${e}`);
                return Promise.resolve(null);
            });
    }

    public async getRender(key: string) {
        return this.get(this.getFullKey(key, this.renderCacheKeyPrefix));
    }

    public async getResponse(key: string) {
        return this.get(this.getFullKey(key, this.responseCacheKeyPrefix));
    }

    private async set<DataType>(key: string, data: DataType) {
        return this.client
            .set(key, JSON.stringify(data), {
                PX: this.ttl,
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
        return this.set(this.getFullKey(key, this.renderCacheKeyPrefix), data);
    }

    public async setResponse(key: string, data: XpResponseProps) {
        return this.set(
            this.getFullKey(key, this.responseCacheKeyPrefix),
            data
        );
    }

    public async delete(key: string) {
        const responseKey = this.getFullKey(key, this.responseCacheKeyPrefix);
        const renderKey = this.getFullKey(key, this.renderCacheKeyPrefix);

        logger.info(
            `Deleting redis cache entries for ${responseKey} and ${renderKey}`
        );

        return this.client.del([responseKey, renderKey]).catch((e) => {
            logger.error(`Error deleting value for key ${key} - ${e}`);
            return 0;
        });
    }

    public async clear() {
        logger.info('Clearing redis cache!');

        return this.client.flushDb().catch((e) => {
            logger.error(`Error flushing database - ${e}`);
            return 'error';
        });
    }

    private getFullKey(key: string, keyPrefix: string) {
        return `${keyPrefix}:${pathToCacheKey(key)}`;
    }
}

class RedisCacheDummy implements IRedisCache {
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

    public async delete(key: string) {
        return 1;
    }

    public async clear() {
        return 'Ok';
    }
}

export const RedisCache =
    process.env.NODE_ENV !== 'development' &&
    process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD &&
    validateClientOptions()
        ? RedisCacheImpl
        : RedisCacheDummy;
