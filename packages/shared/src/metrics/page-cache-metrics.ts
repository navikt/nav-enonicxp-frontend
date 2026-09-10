import { Counter, register } from 'prom-client';

// The page cache is a funnel of two independent layers. Both talk to Valkey, but they hold
// different things, under different key prefixes, with different invalidation behaviour. Always
// select on `layer` before reading `source`, otherwise the two get conflated.
//
// layer='render'   - Next.js incremental cache (rendered pages), see cache/page-cache-handler.ts
//                    Valkey key prefix: `${ENV}:render:${buildId}:${decoratorVersionId}`
//                    NOTE: the prefix contains the buildId, so *every deploy invalidates the whole
//                    render cache*. Expect source='miss' to spike to ~100% on deploy.
//   source='next'   -> served from the in-process LRU (first line of cache)
//   source='valkey' -> served from the Valkey render cache
//   source='miss'   -> neither had it; Next will regenerate the page, which falls through to the
//                      response layer below
//
// layer='response' - XP sitecontent responses, see utils/fetch/fetch-content.ts
//                    Valkey key prefix: `${ENV}:xp-response` (no buildId, survives deploys)
//   source='valkey' -> served from the Valkey response cache
//   source='xp'     -> fetched from the Enonic XP origin
//
// layer='bypass'   - requests that are not cachable at all (draft/preview/archive/version history).
//                    These never consult either cache and would otherwise inflate the 'xp' series.
//   source='xp'     -> fetched from the Enonic XP origin
//
export const pageCacheOperationsCounter =
    (register.getSingleMetric('page_cache_operations_total') as Counter) ??
    new Counter({
        name: 'page_cache_operations_total',
        help: 'Total page cache operations, by cache layer and the source which served the operation',
        labelNames: ['operation', 'layer', 'source'],
    });

// A failed Valkey read resolves to null and is therefore indistinguishable from a genuine cache
// miss at the call site. Count it separately so Valkey degradation does not silently masquerade as
// legitimate origin traffic.
//
// reason='timeout' -> the read exceeded CACHE_READ_TIMEOUT_MS
// reason='error'   -> the client rejected (connection down, parse failure, etc)
export const pageCacheErrorsCounter =
    (register.getSingleMetric('page_cache_errors_total') as Counter) ??
    new Counter({
        name: 'page_cache_errors_total',
        help: 'Total page cache read/write failures, counted as cache misses by the caller',
        labelNames: ['operation', 'layer', 'reason'],
    });
