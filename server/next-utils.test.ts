import mockFs from 'mock-fs';
import { getNextBuildId, getNextServer } from './next-utils';
import NextNodeServer from 'next/dist/server/next-server';
import next from 'next';
import path from 'path';
import fsPromises from 'fs/promises';

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

    test('Should the specified buildId', () => {
        const buildId = getNextBuildId(nextServer);

        expect(buildId).toEqual('testId');
    });
});

describe('Set next.js image cache dir', () => {
    const nextApp = getNextApp();
    let nextServer: NextNodeServer;

    const imgCacheDir = 'myImgCacheDir';

    process.env.IMAGE_CACHE_DIR = `/${imgCacheDir}`;

    beforeAll(async () => {
        await nextApp.prepare();
        nextServer = getNextServer(nextApp);
    });

    afterEach(() => {
        mockFs.restore();
    });

    test('IncremetalCache should write to the correct image cache dir', async () => {
        mockFs({});
        fsPromises.writeFile = jest.fn();

        await nextServer['imageResponseCache'].incrementalCache.set(
            'foo',
            {
                kind: 'IMAGE',
                buffer: Buffer.from('bar', 'utf-8'),
                etag: 'test',
                extension: 'png',
            },
            1
        );

        expect(fsPromises.writeFile).toHaveBeenCalledWith(
            expect.stringContaining(imgCacheDir),
            expect.anything()
        );
    });
});
