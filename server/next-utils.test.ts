import mockFs from 'mock-fs';
import {
    getNextBuildId,
    getNextServer,
    injectNextImageCacheDir,
} from './next-utils';
import NextNodeServer from 'next/dist/server/next-server';
import next from 'next';
import path from 'path';
import fs from 'fs';
import { ImageOptimizerCache } from 'next/dist/server/image-optimizer';

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
        nextServer = await getNextServer(nextApp);
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
        nextServer = await getNextServer(nextApp);
        await injectNextImageCacheDir(nextServer, process.env.IMAGE_CACHE_DIR);
    });

    afterEach(() => {
        mockFs.restore();
    });

    test('IncrementalCache should write to the correct image cache dir', async () => {
        mockFs();

        // Handles next.js responseCache async fs write operation
        let resolveOnWriteFile: any = () => {};
        const promise = new Promise((resolve) => {
            resolveOnWriteFile = resolve;
        });

        fs.promises.writeFile = jest.fn(resolveOnWriteFile);

        const imgCache = new ImageOptimizerCache({
            distDir: 'dummyValueWhichGetsReplaceByInjector',
            nextConfig: nextServer['nextConfig'],
        });

        await nextServer['imageResponseCache'].get(
            'foo',
            async () => ({
                value: {
                    kind: 'IMAGE',
                    buffer: Buffer.from('bar', 'utf-8'),
                    etag: 'test',
                    extension: 'png',
                },
                revalidate: 1337,
            }),
            {
                incrementalCache: imgCache,
            }
        );

        await Promise.all([promise]).then(() =>
            expect(fs.promises.writeFile).toHaveBeenCalledWith(
                expect.stringContaining(imgCacheDir),
                expect.anything()
            )
        );
    });
});
