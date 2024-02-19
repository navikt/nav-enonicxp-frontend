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

    getRender(path: string): Promise<CacheHandlerValue | null>;

    setRender(path: string, data: CacheHandlerValue): Promise<string | null>;

    getResponse(path: string): Promise<XpResponseProps | null>;

    setResponse(path: string, data: XpResponseProps): Promise<string | null>;

    delete(path: string): Promise<number>;

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

    private async get(path: string) {
        return this.client
            .get(path)
            .then((result) => (result ? JSON.parse(result) : result))
            .catch((e) => {
                logger.error(`Error getting value for path ${path} - ${e}`);
                return Promise.resolve(null);
            });
    }

    public async getRender(path: string) {
        return this.get(this.getCacheKey(path, this.renderCacheKeyPrefix));
    }

    public async getResponse(path: string) {
        return this.get(this.getCacheKey(path, this.responseCacheKeyPrefix));
    }

    private async set<DataType>(path: string, data: DataType) {
        return this.client
            .set(path, JSON.stringify(data), {
                PX: this.ttl,
            })
            .then((result) => {
                logger.info(`Redis set result for ${path}: ${result}`);
                return result;
            })
            .catch((e) => {
                logger.error(`Error setting value for path ${path} - ${e}`);
                return Promise.resolve(null);
            });
    }

    public async setRender(path: string, data: CacheHandlerValue) {
        return this.set(
            this.getCacheKey(path, this.renderCacheKeyPrefix),
            data
        );
    }

    public async setResponse(path: string, data: XpResponseProps) {
        return this.set(
            this.getCacheKey(path, this.responseCacheKeyPrefix),
            data
        );
    }

    public async delete(path: string) {
        const responseKey = this.getCacheKey(path, this.responseCacheKeyPrefix);
        const renderKey = this.getCacheKey(path, this.renderCacheKeyPrefix);

        logger.info(
            `Deleting redis cache entries for ${responseKey} and ${renderKey}`
        );

        return this.client.del([responseKey, renderKey]).catch((e) => {
            logger.error(`Error deleting value for path ${path} - ${e}`);
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

    private getCacheKey(path: string, keyPrefix: string) {
        return `${keyPrefix}:${pathToCacheKey(path)}`;
    }
}

class RedisCacheDummy implements IRedisCache {
    public async init() {
        return this;
    }

    public async getRender(path: string) {
        return null;
    }

    public async getResponse(path: string) {
        return null;
    }

    public async setRender(path: string, data: CacheHandlerValue) {
        return null;
    }

    public async setResponse(path: string, data: XpResponseProps) {
        return null;
    }

    public async delete(path: string) {
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
