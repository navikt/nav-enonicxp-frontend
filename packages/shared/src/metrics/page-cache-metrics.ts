import { Counter, register } from 'prom-client';

// Single source of truth for the page-serving funnel metric. It is incremented from two layers that
// run in the same Node process and share prom-client's default registry:
//   - the render-cache handler (packages/server, loaded by Next.js as the incremental cacheHandler)
//   - the content-fetch layer (packages/nextjs .../fetch-content.ts)
// Because the registry is shared, this is one Counter, and it is what /internal/metrics exposes.
//
// source — the team's cache tiers, recorded at the deepest tier that actually served the request:
//   'next'   -> served from the in-process LRU (first line of cache)
//   'valkey' -> served from Valkey (either the render cache or the response cache)
//   'xp'     -> fetched from the Enonic XP origin (which then regenerates the caches)
// operation — 'get' (a read/serve) or 'set' (a cache write during regeneration).
//
// The `getSingleMetric(...) ?? new Counter(...)` guard returns the already-registered instance when this
// module is evaluated a second time (it is bundled into both the server and Next.js outputs), instead of
// throwing on a duplicate registration.
export const pageCacheOperationsCounter =
    (register.getSingleMetric('page_cache_operations_total') as Counter) ??
    new Counter({
        name: 'page_cache_operations_total',
        help: 'Total page cache operations',
        labelNames: ['operation', 'source'],
    });
