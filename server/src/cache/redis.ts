import { createClient, RedisClientOptions } from 'redis';
import { CacheHandlerValue } from 'next/dist/server/lib/incremental-cache';
import { logger } from 'srcCommon/logger';

type AppEnv = typeof process.env.ENV;

const clientOptions: Record<AppEnv, RedisClientOptions> = {
    localhost: {
        url: process.env.REDIS_URI_PAGECACHE,
        username: process.env.REDIS_USERNAME_PAGECACHE,
        password: process.env.REDIS_PASSWORD_PAGECACHE,
    },
    prod: {
        url: process.env.REDIS_URI_PAGECACHE,
        username: process.env.REDIS_USERNAME_PAGECACHE,
        password: process.env.REDIS_PASSWORD_PAGECACHE,
    },
    dev1: {
        url: process.env.REDIS_URI_PAGECACHE_DEV1,
        username: process.env.REDIS_USERNAME_PAGECACHE_DEV1,
        password: process.env.REDIS_PASSWORD_PAGECACHE_DEV1,
    },
    dev2: {
        url: process.env.REDIS_URI_PAGECACHE_DEV2,
        username: process.env.REDIS_USERNAME_PAGECACHE_DEV2,
        password: process.env.REDIS_PASSWORD_PAGECACHE_DEV2,
    },
} as const;

interface IRedisCache {
    init(keyPrefix: string): Promise<void>;
    get(key: string): Promise<CacheHandlerValue | null>;
    set(key: string, data: CacheHandlerValue): Promise<string | null>;
    delete(key: string): Promise<number>;
    clear(): Promise<string>;
}

type ConstructorProps = {
    ttl: number;
};

export class RedisCache implements IRedisCache {
    private readonly client: ReturnType<typeof createClient>;
    private readonly ttl: number;
    private keyPrefix: string = '';

    constructor({ ttl }: ConstructorProps) {
        const env = process.env.ENV;
        const options = clientOptions[env];

        if (!options) {
            throw Error(
                `Redis client options were not defined for the current app environment: ${env}`
            );
        }

        this.ttl = ttl;
        this.keyPrefix = process.env.BUILD_ID;

        this.client = createClient({
            ...options,
            socket: { keepAlive: 5000, connectTimeout: 10000 },
        })
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

        logger.info(`Created redis client with url ${options.url}`);
    }

    private async connect() {
        this.client.connect();
    }

    public async init(keyPrefix: string) {
        this.keyPrefix = keyPrefix;

        return this.client.connect().then(() => {
            logger.info(
                `Initialized redis client with key prefix ${keyPrefix}`
            );
        });
    }

    public async get(key: string) {
        const prefixedKey = this.getPrefixedKey(key);

        return this.client
            .get(prefixedKey)
            .then((result) => {
                return result ? JSON.parse(result) : result;
            })
            .catch((e) => {
                logger.error(`Error getting value for key ${key} - ${e}`);
                return Promise.resolve(null);
            });
    }

    public async set(key: string, data: CacheHandlerValue) {
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

    public async delete(key: string) {
        const prefixedKey = this.getPrefixedKey(key);
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

    private getPrefixedKey(key: string) {
        return `${this.keyPrefix}:${key}`;
    }
}

export class RedisCacheDummy implements IRedisCache {
    public async init(keyPrefix: string) {
        return;
    }
    public async get(key: string) {
        return null;
    }
    public async set(key: string, data: CacheHandlerValue) {
        return null;
    }
    public async delete(key: string) {
        return 1;
    }
    public async clear() {
        return 'Ok';
    }
}
