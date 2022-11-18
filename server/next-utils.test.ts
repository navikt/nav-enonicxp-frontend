import next from 'next';
import {
    getIncrementalCacheGetFsPathFunction,
    getIncrementalCacheMemoryCache,
    getNextBuildId,
    getNextServer,
} from './next-utils';
import NextNodeServer from 'next/dist/server/next-server';
import { NextServer } from 'next/dist/server/next';
import { execFileSync, execSync } from 'child_process';

describe('Next server private accessors', () => {
    let nextApp: NextServer;
    let nextServer: NextNodeServer;

    beforeAll(async () => {
        console.log(__dirname);
        execFileSync('./__next-test/build.sh');
        nextApp = next({
            dir: './__next-test',
        });

        await nextApp.prepare();
        nextServer = getNextServer(nextApp);
    });

    test('Should get a NextNodeServer', () => {
        expect(nextServer).toBeInstanceOf(NextNodeServer);
    });

    test('Should get a buildId', () => {
        const buildId = getNextBuildId(nextServer);
        expect(typeof buildId === 'string').toBe(true);
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

    test('getFsPath function should have the expected call signature', async () => {
        const getFsPath = getIncrementalCacheGetFsPathFunction(nextServer);

        const returnValue = await getFsPath('/test', false);

        expect(returnValue.filePath.endsWith('test')).toBe(true);
        expect(returnValue.isAppPath).toBe(false);
    });
});
