import { createClient, RedisClientOptions } from 'redis';
import { CacheHandlerValue } from 'next/dist/server/lib/incremental-cache';

type AppEnv = typeof process.env.ENV;

const clientOptions: { [key in AppEnv]?: RedisClientOptions } = {
    localhost: {
        url: process.env.REDIS_URI_PAGECACHE,
        username: process.env.REDIS_USERNAME_PAGECACHE,
        password: process.env.REDIS_PASSWORD_PAGECACHE,
    },
    dev1: {
        url: process.env.REDIS_URI_PAGECACHE_DEV1,
        username: process.env.REDIS_USERNAME_PAGECACHE_DEV1,
        password: process.env.REDIS_PASSWORD_PAGECACHE_DEV1,
    },
};

type ConstructorProps = {
    ttl: number;
};

export class RedisCache {
    private readonly client: ReturnType<typeof createClient>;
    private readonly ttl: number;

    constructor({ ttl }: ConstructorProps) {
        const options = clientOptions[process.env.ENV];

        if (!options) {
            throw Error(
                `Redis client options were not defined for the current app environment ${process.env.ENV}`
            );
        }

        this.ttl = ttl;

        this.client = createClient(options)
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

        console.log(
            `Created redis client with url ${process.env.REDIS_URI_PAGECACHE_DEV1}`
        );
    }

    public async init() {
        await this.client.connect().then(() => {
            console.log(`Initialized redis client`);
        });
    }

    public async get(key: string): Promise<CacheHandlerValue | null> {
        const data = await this.client.get(key);

        if (!data) {
            console.log(`Not found in redis: ${key}`);
            return null;
        }

        console.log(`Found in redis: ${key}`);

        return JSON.parse(data) as CacheHandlerValue;
    }

    public async set(key: string, data: CacheHandlerValue) {
        return this.client.set(key, JSON.stringify(data), {
            EX: this.ttl,
        });
    }
}
