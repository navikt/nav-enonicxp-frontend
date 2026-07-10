import { Counter, register } from 'prom-client';

// source — the target of the cache operation:
//   'next'   -> served from the in-process LRU (first line of cache)
//   'valkey' -> served from Valkey (either the render cache or the response cache)
//   'xp'     -> fetched from the Enonic XP origin (which will regenerate the caches)
//
export const pageCacheOperationsCounter =
    (register.getSingleMetric('page_cache_operations_total') as Counter) ??
    new Counter({
        name: 'page_cache_operations_total',
        help: 'Total page cache operations',
        labelNames: ['operation', 'source'],
    });
