import FileSystemCache from 'next/dist/server/lib/incremental-cache/file-system-cache';
import LRUCache from 'lru-cache';
import { CacheHandlerValue } from 'next/dist/server/lib/incremental-cache';
import fs from 'fs';
import { nodeFs } from 'next/dist/server/lib/node-fs-methods';
import fsPromises from 'fs/promises';

type FileSystemCacheParams = Partial<
    ConstructorParameters<typeof FileSystemCache>[0]
>;

// The type for this method is not exported from next.js
// Be aware it may change when updating the next.js version
type GetFsPathFunction = ({
    pathname,
    appDir,
    fetchCache,
}: {
    pathname: string;
    appDir?: boolean;
    fetchCache?: boolean;
}) => Promise<{
    filePath: string;
    isAppPath: boolean;
}>;

const CACHE_TTL_24_HOURS = 3600 * 24 * 1000;

const isrMemoryCache = new LRUCache<string, CacheHandlerValue>({
    max: 2000,
    ttl: CACHE_TTL_24_HOURS,
    ttlResolution: 1000,
});

export default class CustomFileSystemCache extends FileSystemCache {
    constructor(ctx: FileSystemCacheParams = {}) {
        if (!process.env.PAGE_CACHE_DIR) {
            console.error('PAGE_CACHE_DIR is not defined!');
        }

        super({
            ...ctx,
            serverDistDir:
                process.env.PAGE_CACHE_DIR || (ctx.serverDistDir as string),
            fs: ctx.fs || nodeFs,
            dev: ctx.dev ?? process.env.NODE_ENV === 'development',
            _appDir: ctx._appDir ?? false,
            _requestHeaders: ctx._requestHeaders || {},
            revalidatedTags: ctx.revalidatedTags || [],
        });
    }

    public async get(key: string, fetchCache?: boolean) {
        const dataFromMemoryCache = isrMemoryCache.get(key);
        if (dataFromMemoryCache) {
            return dataFromMemoryCache;
        }

        const dataFromFileSystemCache = await super.get(key, fetchCache);
        if (dataFromFileSystemCache?.lastModified) {
            const ttlRemaining = dataFromFileSystemCache.lastModified
                ? dataFromFileSystemCache.lastModified +
                  CACHE_TTL_24_HOURS -
                  Date.now()
                : CACHE_TTL_24_HOURS;

            if (ttlRemaining > 1000) {
                isrMemoryCache.set(key, dataFromFileSystemCache, {
                    ttl: ttlRemaining,
                });
            }
        }

        return dataFromFileSystemCache;
    }

    public async set(key: string, data: CacheHandlerValue['value']) {
        isrMemoryCache.set(key, { value: data, lastModified: Date.now() });
        return super.set(key, data);
    }

    public async clearGlobalCache() {
        let didClearFs;

        try {
            const { filePath } = await (this['getFsPath'] as GetFsPathFunction)(
                {
                    pathname: '',
                }
            );

            if (fs.existsSync(filePath)) {
                fs.rmSync(filePath, { recursive: true });
            }

            console.log(`Wiped all cached pages from ${filePath}`);

            didClearFs = true;
        } catch (e) {
            console.error(
                `Error occurred while wiping page-cache from disk - ${e}`
            );
            didClearFs = false;
        }

        isrMemoryCache.clear();

        return didClearFs;
    }

    public async deleteGlobalCacheEntry(path: string) {
        const pagePath = path === '/' ? '/index' : path;

        return Promise.all([
            this.deletePageCacheFile(`${pagePath}.html`),
            this.deletePageCacheFile(`${pagePath}.json`),
        ])
            .catch((e) => {
                console.error(
                    `Error occurred while invalidating page cache for path ${pagePath} - ${e}`
                );
            })
            .finally(() => isrMemoryCache.delete(pagePath));
    }

    private async deletePageCacheFile(pathname: string) {
        return (this['getFsPath'] as GetFsPathFunction)({
            pathname: pathname,
        })
            .then(({ filePath }) => fsPromises.unlink(filePath))
            .then(() => {
                console.log(`Removed file from page cache: ${pathname}`);
            })
            .catch((e: any) => {
                console.log(
                    `Failed to remove file from page cache: ${pathname} - ${e}`
                );
            });
    }
}
