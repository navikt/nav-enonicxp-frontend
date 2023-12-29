import { createClient } from 'redis';

const client = createClient({
    url: process.env.REDIS_URI_PAGECACHE_DEV1,
    username: process.env.REDIS_USERNAME_PAGECACHE_DEV1,
    password: process.env.REDIS_PASSWORD_PAGECACHE_DEV1,
});

client.on('error', (err) => console.error(`Redis client error: ${err}`));

export const initRedis = async () => {};
