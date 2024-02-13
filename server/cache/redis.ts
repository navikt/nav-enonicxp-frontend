import { createClient } from 'redis';
import { CacheHandlerValue } from 'next/dist/server/lib/incremental-cache';

class RedisClient {
    private readonly client: ReturnType<typeof createClient>;

    constructor() {
        this.client = createClient({
            url: process.env.REDIS_URI_PAGECACHE_DEV1,
            username: process.env.REDIS_USERNAME_PAGECACHE_DEV1,
            password: process.env.REDIS_PASSWORD_PAGECACHE_DEV1,
        });

        console.log(
            `Created redis client with url ${process.env.REDIS_URI_PAGECACHE_DEV1}`
        );
    }

    public async init() {
        await this.client
            .on('error', (err) => {
                console.error('Redis client error: ', err);
            })
            .connect()
            .then(() => {
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
        console.log(`Setting data for ${key}`);

        const result = await this.client.set(key, JSON.stringify(data));

        console.log(`Set key ${key} result`, result);
    }
}

export const redisClient = new RedisClient();
