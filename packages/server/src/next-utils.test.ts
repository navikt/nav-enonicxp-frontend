import { __getNextTestApp } from '../__test-utils/utils';
import { getNextBuildId } from './next-utils';

describe('Next.js server private accessors', () => {
    const nextApp = __getNextTestApp();

    beforeAll(async () => {
        await nextApp.prepare();
    });

    test('Should the specified buildId', async () => {
        const buildId = await getNextBuildId();

        expect(buildId).toEqual('test-build-id');
    });
});
