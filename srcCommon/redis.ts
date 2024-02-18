import { createClient, RedisClientOptions } from 'redis';
import { CacheHandlerValue } from 'next/dist/server/lib/incremental-cache';
import { logger } from 'srcCommon/logger';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';

const CLIENT_OPTIONS: RedisClientOptions = {
    url: process.env.REDIS_URI_PAGECACHE,
    username: process.env.REDIS_USERNAME_PAGECACHE,
    password: process.env.REDIS_PASSWORD_PAGECACHE,
    socket: { keepAlive: 5000, connectTimeout: 10000 },
} as const;

const DEPLOY_ENV = process.env.ENV;

interface IRedisCache<DataType> {
    init(keyPrefix: string, ttl: number): Promise<IRedisCache<DataType>>;
    get(key: string): Promise<DataType | null>;
    set(key: string, data: DataType): Promise<string | null>;
    delete(key: string): Promise<number>;
    clear(): Promise<string>;
}

class RedisCacheImpl<DataType> implements IRedisCache<DataType> {
    private readonly client: ReturnType<typeof createClient>;
    private keyPrefix: string = '';
    private ttl: number = 0;

    constructor() {
        this.client = createClient(CLIENT_OPTIONS)
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

        logger.info(`Created redis client with url ${CLIENT_OPTIONS.url}`);
    }

    public async init(keyPrefix: string, ttl: number) {
        this.keyPrefix = keyPrefix;
        this.ttl = ttl;

        return this.client.connect().then(() => {
            logger.info(
                `Initialized redis client with key prefix ${keyPrefix} and ttl ${ttl}`
            );
            return this;
        });
    }

    public async get(key: string) {
        const prefixedKey = this.getPrefixedKey(key);

        return this.client
            .get(prefixedKey)
            .then((result) => (result ? JSON.parse(result) : result))
            .catch((e) => {
                logger.error(`Error getting value for key ${key} - ${e}`);
                return Promise.resolve(null);
            });
    }

    public async set(key: string, data: DataType) {
        return this.client
            .set(this.getPrefixedKey(key), JSON.stringify(data), {
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

    public async delete(key: string, keyPrefix?: string) {
        const prefixedKey = this.getPrefixedKey(key, keyPrefix);
        logger.info(`Deleting redis cache entry for ${prefixedKey}`);

        return this.client.del(prefixedKey).catch((e) => {
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

    private getPrefixedKey(key: string, keyPrefix = this.keyPrefix) {
        return `${keyPrefix}:${DEPLOY_ENV}:${key}`;
    }
}

class RedisCacheDummy<DataType> implements IRedisCache<DataType> {
    public async init(keyPrefix: string, ttl: number) {
        return this;
    }
    public async get(key: string) {
        return null;
    }
    public async set(key: string, data: DataType) {
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
    CLIENT_OPTIONS.url &&
    CLIENT_OPTIONS.username &&
    CLIENT_OPTIONS.password &&
    process.env.NODE_ENV !== 'development' &&
    process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD
        ? RedisCacheImpl
        : RedisCacheDummy;
