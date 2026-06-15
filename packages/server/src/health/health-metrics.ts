import { Counter, Gauge } from 'prom-client';

export const healthProbeFailuresCounter = new Counter({
    name: 'health_probe_failures_total',
    help: 'Total number of failed health probes',
});

export const healthStatusGauge = new Gauge({
    name: 'health_status',
    help: 'Health status (1 = healthy, 0 = unhealthy)',
});
