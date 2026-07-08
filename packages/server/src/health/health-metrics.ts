import { Counter, Gauge, register } from 'prom-client';

export const healthProbeFailuresCounter =
    (register.getSingleMetric('health_probe_failures_total') as Counter) ??
    new Counter({
        name: 'health_probe_failures_total',
        help: 'Total number of failed health probes',
    });

export const healthStatusGauge =
    (register.getSingleMetric('health_status') as Gauge) ??
    new Gauge({
        name: 'health_status',
        help: 'Health status (1 = healthy, 0 = unhealthy)',
    });
