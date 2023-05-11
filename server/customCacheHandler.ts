import FileSystemCache from 'next/dist/server/lib/incremental-cache/file-system-cache';
import LRUCache from 'lru-cache';
import { CacheHandlerValue } from 'next/dist/server/lib/incremental-cache';
import fs from 'fs';
import { nodeFs } from 'next/dist/server/lib/node-fs-methods';

type FileSystemCacheParams = Partial<
    ConstructorParameters<typeof FileSystemCache>[0]
>;

const { PAGE_CACHE_DIR, NODE_ENV } = process.env;

const isrMemoryCache = new LRUCache<string, CacheHandlerValue>({
    max: 1000,
    ttl: 3600 * 24 * 1000,
});

export default class CustomFileSystemCache extends FileSystemCache {
    constructor(ctx: FileSystemCacheParams = {}) {
        super({
            ...ctx,
            serverDistDir: PAGE_CACHE_DIR,
            fs: ctx.fs || nodeFs,
            dev: ctx.dev || NODE_ENV === 'development',
            _appDir: ctx._appDir || false,
            _requestHeaders: ctx._requestHeaders || {},
            revalidatedTags: ctx.revalidatedTags || [],
        });
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

    public async clearGlobalCache() {
        isrMemoryCache.clear();

        try {
            const { filePath } = await this['getFsPath']({
                pathname: '',
            });

            if (fs.existsSync(filePath)) {
                fs.rmSync(filePath, { recursive: true });
            }

            console.log(`Wiped all cached pages from ${filePath}`);

            return true;
        } catch (e) {
            console.error(
                `Error occurred while wiping page-cache from disk - ${e}`
            );
            return false;
        }
    }

    public async removeGlobalCacheEntry(path: string) {}
}
