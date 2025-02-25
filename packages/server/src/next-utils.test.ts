import NextNodeServer from 'next/dist/server/next-server';
import { __getNextTestApp } from '../__test-utils/utils';
import { getNextBuildId, getNextServer } from './next-utils';

describe('Next.js server private accessors', () => {
    const nextApp = __getNextTestApp();
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
