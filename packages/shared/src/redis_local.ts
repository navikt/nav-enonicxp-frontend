import { createClient, RedisClientOptions } from 'redis';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import { CacheHandlerValue } from 'next/dist/server/lib/incremental-cache';
import { logger } from './logger';
import { TIME_24_HOURS_IN_MS, TIME_72_HOURS_IN_MS } from './constants';
import { pathToCacheKey } from './cache-key';

type XpResponseProps = Record<string, any>;

const clientOptions: RedisClientOptions = {
    url: process.env.REDIS_URI_PAGECACHE,
    username: process.env.VALKEY_USERNAME_PAGECACHE,
    password: process.env.VALKEY_PASSWORD_PAGECACHE,
    socket: { keepAlive: true, connectTimeout: 10000 },
} as const;

const validateClientOptions = () => {
    const isValid = !!(clientOptions.url && clientOptions.username && clientOptions.password);

    if (!isValid) {
        logger.error(`Client options for Valkey has missing parameters!`);
    }

    return isValid;
};

class RedisCacheImpl {
    private readonly client: ReturnType<typeof createClient>;

    private readonly responseCacheTTL: number = TIME_72_HOURS_IN_MS;
    private readonly renderCacheTTL: number = TIME_24_HOURS_IN_MS;

    private buildId: string = '';

    private readonly responseCacheKeyPrefix = `${process.env.ENV}:xp-response`;
    private renderCacheKeyPrefix = '';

    constructor() {
        logger.info(clientOptions.url);
        logger.info(clientOptions.username);
        this.client = createClient(clientOptions)
            .on('connect', () => {
                logger.info('Valkey client connected');
            })
            .on('ready', () => {
                logger.info('Valkey client ready');
            })
            .on('end', () => {
                logger.info('Valkey client connection closed');
            })
            .on('reconnecting', () => {
                logger.info('Valkey client reconnecting');
            })
            .on('error', (err) => {
                logger.error(`Valkey client error: ${err}`);
            });
    }

    public async init(buildId: string, decoratorVersionId: string) {
        this.buildId = buildId;
        this.updateRenderCacheKeyPrefix(decoratorVersionId);

        return this.client.connect().then(() => {
            logger.info(
                `Initialized valkey client with url ${clientOptions.url} - Render key prefix: ${this.renderCacheKeyPrefix} - Response key prefix: ${this.responseCacheKeyPrefix}`
            );
            return this;
        });
    }

    public getKeyPrefixes() {
        return [this.responseCacheKeyPrefix, this.renderCacheKeyPrefix];
    }

    public updateRenderCacheKeyPrefix(decoratorVersionId: string) {
        this.renderCacheKeyPrefix = `${process.env.ENV}:render:${this.buildId}:${decoratorVersionId}`;
    }

    public async getRender(key: string) {
        const fullKey = this.getFullKey(key, this.renderCacheKeyPrefix);
        return this.client
            .getEx(fullKey, {
                PX: this.renderCacheTTL,
            })
            .then((result) => (result ? JSON.parse(result) : result))
            .catch((e) => {
                logger.error(`Error getting render cache value for key ${fullKey} - ${e}`);
                return Promise.resolve(null);
            });
    }

    public async getResponse(key: string) {
        const fullKey = this.getFullKey(key, this.responseCacheKeyPrefix);
        return this.client
            .get(fullKey)
            .then((result) => (result ? JSON.parse(result) : result))
            .catch((e) => {
                logger.error(`Error getting value for key ${fullKey} - ${e}`);
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
        return this.set(this.getFullKey(key, this.renderCacheKeyPrefix), this.renderCacheTTL, data);
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

    public updateRenderCacheKeyPrefix(_key: string) {
        return;
    }

    public async getRender(_key: string) {
        return null;
    }

    public async getResponse(_key: string) {
        return null;
    }

    public async setRender(_key: string, _data: CacheHandlerValue) {
        return null;
    }

    public async setResponse(_key: string, _data: XpResponseProps) {
        return null;
    }
}

export const RedisCache =
    process.env.NODE_ENV !== 'development' &&
    process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD &&
    validateClientOptions()
        ? RedisCacheImpl
        : RedisCacheDummy;
