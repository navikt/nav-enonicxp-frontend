import mockFs from 'mock-fs';
import CustomFileSystemCache from './custom-cache-handler';
import fsPromises from 'fs/promises';

describe('Custom cache handler for ISR page cache', () => {
    const pageCacheDir = 'myPageCacheDir';

    process.env.PAGE_CACHE_DIR = `/${pageCacheDir}`;

    afterEach(() => {
        mockFs.restore();
    });

    test('getFsPath should return paths with the correct page cache dir', async () => {
        const cacheHandler = new CustomFileSystemCache();

        const { filePath } = await cacheHandler['getFsPath']({ pathname: '' });

        expect(filePath).toContain(pageCacheDir);
    });

    test('IncrementalCache should write to the correct page cache dir', async () => {
        mockFs({});
        fsPromises.writeFile = jest.fn();

        const cacheHandler = new CustomFileSystemCache({ flushToDisk: true });

        await cacheHandler.set('foo', {
            kind: 'PAGE',
            html: 'test',
            pageData: {},
        });

        expect(fsPromises.writeFile).toHaveBeenCalledWith(
            expect.stringContaining(pageCacheDir),
            expect.anything()
        );
    });
});
