import { getRouteCacheKey } from 'next/dist/server/lib/route-cache-key';
import { RouteKind } from 'next/dist/server/route-kind';
import { renderCacheKeyToPathname } from '@/shared/cache-key';

jest.mock('@/shared/logger', () => ({
    logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

jest.mock('@/shared/redis_local', () => ({
    RedisCache: jest.fn().mockImplementation(() => ({
        getRender: jest.fn().mockResolvedValue(null),
        setRender: jest.fn(),
    })),
}));

// Builds the key Next >= 16.4 passes to the cache handler for a page served by `sourceRoute`
const nextKey = (path: string, sourceRoute = '/[[...pathRouter]]') =>
    getRouteCacheKey(path, { kind: RouteKind.PAGES, sourceRoute });

describe('Render cache keys', () => {
    // Expected values are the pathname keys revalidator-proxy invalidates in Valkey
    test.each([
        ['/', '/index'],
        ['/arbeidsgiver', '/arbeidsgiver'],
        ['/no/person/arbeid', '/no/person/arbeid'],
    ])('Next key for %s maps to Valkey key %s', (path, expected) => {
        expect(renderCacheKeyToPathname(nextKey(path))).toBe(expected);
    });
});

describe('PageCacheHandler', () => {
    test.each([
        ['/arbeidsgiver', '/[[...pathRouter]]'],
        ['/', '/[[...pathRouter]]'],
        ['/arbeidsgiver', '/[[...someOtherRoute]]'],
    ])(
        'delete(%s) removes the entry Next stored for source route %s',
        async (path, sourceRoute) => {
            const { default: PageCacheHandler } = await import('./page-cache-handler');
            const handler = new PageCacheHandler();
            const key = nextKey(path, sourceRoute);

            await handler.set(key, { kind: 'PAGES' } as any, {} as any);
            expect(await handler.get(key, {} as any)).not.toBeNull();

            await handler.delete(path);
            expect(await handler.get(key, {} as any)).toBeNull();
        }
    );
});
