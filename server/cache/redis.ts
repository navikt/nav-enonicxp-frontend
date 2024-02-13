import { createClient, RedisClientOptions } from 'redis';
import { CacheHandlerValue } from 'next/dist/server/lib/incremental-cache';

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
                console.log('Redis client connected');
            })
            .on('ready', () => {
                console.log('Redis client ready');
            })
            .on('end', () => {
                console.log('Redis client connection closed');
            })
            .on('reconnecting', () => {
                console.log('Redis client reconnecting');
            })
            .on('error', (err) => {
                console.error('Redis client error: ', err);
            });

        console.log(`Created redis client with url ${options.url}`);
    }

    public async init(keyPrefix: string) {
        this.keyPrefix = keyPrefix;

        await this.client.connect().then(() => {
            console.log(
                `Initialized redis client with key prefix ${keyPrefix}`
            );
        });
    }

    public async get(key: string) {
        const prefixedKey = this.getPrefixedKey(key);

        const data = await this.client.get(prefixedKey);

        if (!data) {
            return null;
        }

        return JSON.parse(data) as CacheHandlerValue;
    }

    public async set(key: string, data: CacheHandlerValue) {
        return this.client.set(this.getPrefixedKey(key), JSON.stringify(data), {
            PX: this.ttl,
        });
    }

    public async delete(key: string) {
        const prefixedKey = this.getPrefixedKey(key);
        console.log(`Deleting redis cache entry for ${prefixedKey}`);
        return this.client.del(prefixedKey);
    }

    public async clear() {
        console.log('Clearing redis cache!');
        return this.client.flushDb();
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
