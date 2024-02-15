import mockFs from 'mock-fs';
import fsPromises from 'fs/promises';

describe('Custom cache handler for ISR page cache', () => {
    const pageCacheDir = 'myPageCacheDir';

    process.env.PAGE_CACHE_DIR = `/${pageCacheDir}`;

    beforeEach(() => {
        jest.resetModules();
    });

    afterEach(() => {
        mockFs.restore();
    });

    test('getFsPath should return paths with the correct page cache dir', async () => {
        const CustomFileSystemCache = (
            await import('cache/custom-cache-handler')
        ).default;

        const cacheHandler = new CustomFileSystemCache();

        const filePath = cacheHandler.getFilePathPublic('', 'pages');

        expect(filePath).toContain(pageCacheDir);
    });

    test('IncrementalCache should write to the correct page cache dir', async () => {
        const CustomFileSystemCache = (
            await import('cache/custom-cache-handler')
        ).default;

        const cacheHandler = new CustomFileSystemCache({
            flushToDisk: true,
        });

        mockFs({});
        fsPromises.writeFile = jest.fn();

        await cacheHandler.set(
            'foo',
            {
                kind: 'PAGE',
                html: 'test',
                pageData: {},
                postponed: undefined,
                headers: undefined,
                status: undefined,
            },
            {}
        );

        expect(fsPromises.writeFile).toHaveBeenCalledWith(
            expect.stringContaining(pageCacheDir),
            expect.anything()
        );
    });
});
