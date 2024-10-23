describe('Set cache key middleware', () => {
    const res: any = {};
    const next = jest.fn();

    beforeEach(() => {
        global.cacheKey = undefined;
        jest.resetModules();
    });

    test('Cache key should be set', async () => {
        const { setCacheKey } = await import('./set-cache-key');
        const cacheKey = 'myCacheKey';

        setCacheKey({ headers: { cache_key: cacheKey, cache_ts: '1' } } as any, res, next);

        expect(global.cacheKey).toEqual(cacheKey);
    });

    test('Cache key with highest timestamp should be kept', async () => {
        const { setCacheKey } = await import('./set-cache-key');

        const oldCacheKey = { cache_key: 'key 1', cache_ts: '1' };
        const newCacheKey = { cache_key: 'key 2', cache_ts: '2' };

        setCacheKey({ headers: newCacheKey } as any, res, next);
        setCacheKey({ headers: oldCacheKey } as any, res, next);

        expect(global.cacheKey).toEqual(newCacheKey.cache_key);
    });

    test('Requests without a cache key header should be ignored', async () => {
        const { setCacheKey } = await import('./set-cache-key');

        const cacheKey = 'myCacheKey';

        setCacheKey({ headers: { cache_key: cacheKey, cache_ts: '1' } } as any, res, next);
        setCacheKey({ headers: {} } as any, res, next);

        expect(global.cacheKey).toEqual(cacheKey);
    });
});

export {};
