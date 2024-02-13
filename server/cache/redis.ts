import { createClient, RedisClientOptions, RedisClientType } from 'redis';

const redisOptions = {
    url: process.env.REDIS_URI_PAGECACHE_DEV1,
    username: process.env.REDIS_USERNAME_PAGECACHE_DEV1,
    password: process.env.REDIS_PASSWORD_PAGECACHE_DEV1,
};

type ConstructorProps = {
    clientOptions: RedisClientOptions;
};

export class RedisClient {
    private readonly client: RedisClientType<any, any, any>;

    constructor({ clientOptions }: ConstructorProps) {
        this.client = createClient(clientOptions);
    }
}
