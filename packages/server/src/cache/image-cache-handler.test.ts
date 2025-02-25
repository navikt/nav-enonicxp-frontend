import NextNodeServer from 'next/dist/server/next-server';
import mockFs from 'mock-fs';
import fs from 'fs';
import { ImageOptimizerCache } from 'next/dist/server/image-optimizer';
import { __getNextTestApp } from '../../__test-utils/utils';
import { getNextServer } from '../next-utils';
import { injectNextImageCacheDir } from './image-cache-handler';

describe('Set next.js image cache dir', () => {
    const nextApp = __getNextTestApp();
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
