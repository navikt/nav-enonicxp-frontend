import { Counter } from 'prom-client';

export const blockedRequestsCounter = new Counter({
    name: 'blocked_requests_total',
    help: 'Total number of requests blocked by path validation',
    labelNames: ['reason'],
});

export const pageCacheOperationsCounter = new Counter({
    name: 'page_cache_operations_total',
    help: 'Total page cache operations',
    labelNames: ['operation', 'source'],
});
