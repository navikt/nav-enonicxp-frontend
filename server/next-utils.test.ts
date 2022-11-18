import {
    getIncrementalCacheGetFsPathFunction,
    getIncrementalCacheMemoryCache,
    getNextBuildId,
    getNextServer,
    setImageCacheDir,
    setPageCacheDir,
} from './next-utils';
import NextNodeServer from 'next/dist/server/next-server';
import next from 'next';
import path from 'path';

const getNextApp = () =>
    next({
        conf: {},
        dir: path.join(__dirname, '__next-test-dummy'),
    });

describe('Next.js server private accessors', () => {
    const nextApp = getNextApp();
    let nextServer: NextNodeServer;

    beforeAll(async () => {
        await nextApp.prepare();
        nextServer = getNextServer(nextApp);
    });

    test('Should get a NextNodeServer', () => {
        expect(nextServer).toBeInstanceOf(NextNodeServer);
    });

    test('Should get a buildId', () => {
        const buildId = getNextBuildId(nextServer);

        expect(buildId).toEqual('testId');
    });

    test('LRU memory cache should be an instance of LRUCache', () => {
        const memoryCache = getIncrementalCacheMemoryCache(nextServer);

        expect(memoryCache.constructor.name).toEqual('LRUCache');
    });

    test('LRU memory cache object should have the expected functions', () => {
        const memoryCache = getIncrementalCacheMemoryCache(nextServer);

        expect(memoryCache.has).toBeInstanceOf(Function);
        expect(memoryCache.del).toBeInstanceOf(Function);
        expect(memoryCache.reset).toBeInstanceOf(Function);
    });

    test('getFsPath should be a function', () => {
        const getFsPath = getIncrementalCacheGetFsPathFunction(nextServer);

        expect(getFsPath).toBeInstanceOf(Function);
    });

    test('getFsPath function should have the expected return value', async () => {
        const getFsPath = getIncrementalCacheGetFsPathFunction(nextServer);

        const returnValue = await getFsPath('/test', false);

        expect(returnValue.filePath).toMatch(/test$/);
        expect(returnValue.isAppPath).toBe(false);
    });
});

describe('Next.js server cache dir setters', () => {
    const nextApp = getNextApp();
    let nextServer: NextNodeServer;

    const processEnv = process.env;

    beforeAll(async () => {
        await nextApp.prepare();
        nextServer = getNextServer(nextApp);
    });

    beforeEach(() => {
        jest.resetModules();
        process.env = processEnv;
    });

    test('Should set page cache dir from env var', () => {
        process.env.PAGE_CACHE_DIR = '/testDir';
        setPageCacheDir(nextServer);
        expect(
            nextServer['responseCache'].incrementalCache.cacheHandler
                .serverDistDir
        ).toMatch(/\/testDir$/);
    });

    test('Should set image cache dir from env var', () => {
        process.env.IMAGE_CACHE_DIR = '/testDir';
        setImageCacheDir(nextServer);
        expect(
            nextServer['imageResponseCache'].incrementalCache.cacheDir
        ).toMatch(/\/testDir$/);
    });
});
