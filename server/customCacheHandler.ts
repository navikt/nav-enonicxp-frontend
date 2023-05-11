import FileSystemCache from 'next/dist/server/lib/incremental-cache/file-system-cache';
import LRUCache from 'lru-cache';
import { CacheHandlerValue } from 'next/dist/server/lib/incremental-cache';

type Args = ConstructorParameters<typeof FileSystemCache>[0];

export const isrMemoryCache = new LRUCache<string, CacheHandlerValue>({
    max: 1000,
});

export default class CustomFileSystemCache extends FileSystemCache {
    constructor(ctx: Args) {
        // console.log('Hello from my shiny new custom cache');

        super(ctx);

        this['serverDistDir'] = process.env.PAGE_CACHE_DIR;
    }

    public async get(key: string, fetchCache?: boolean) {
        const data = isrMemoryCache.get(key);

        // console.log(
        //     `Found data for key ${key} - ${
        //         data?.value && Object.keys(data.value)
        //     }`
        // );

        return data || super.get(key, fetchCache);
    }

    public async set(key: string, data: CacheHandlerValue['value']) {
        // console.log(
        //     `Setting data with key ${key} - ${JSON.stringify(data)?.slice(
        //         0,
        //         100
        //     )}`
        // );

        isrMemoryCache.set(key, { value: data, lastModified: Date.now() });

        return super.set(key, data);
    }
}
