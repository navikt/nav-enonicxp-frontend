import { Counter, register } from 'prom-client';

export const blockedRequestsCounter =
    (register.getSingleMetric('blocked_requests_total') as Counter) ??
    new Counter({
        name: 'blocked_requests_total',
        help: 'Total number of requests blocked by path validation',
        labelNames: ['reason'],
    });

export const pageCacheOperationsCounter =
    (register.getSingleMetric('page_cache_operations_total') as Counter) ??
    new Counter({
        name: 'page_cache_operations_total',
        help: 'Total page cache operations',
        labelNames: ['operation', 'source'],
    });
