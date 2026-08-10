import { Counter, register } from 'prom-client';

export const blockedRequestsCounter =
    (register.getSingleMetric('blocked_requests_total') as Counter) ??
    new Counter({
        name: 'blocked_requests_total',
        help: 'Total number of requests blocked by path validation',
        labelNames: ['reason'],
    });

export const buildIdMismatchCounter =
    (register.getSingleMetric('next_data_build_id_mismatch_total') as Counter) ??
    new Counter({
        name: 'next_data_build_id_mismatch_total',
        help: 'Total number of _next/data requests with a build id not matching the current one (expected to spike around deploys)',
    });
