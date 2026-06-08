import { logger } from '@/shared/logger';
import { updateHealthMetrics } from './health-metrics';

export interface HealthStatus {
    isHealthy: boolean;
    consecutiveFailures: number;
    lastProbeTime?: number;
    lastError?: string;
    unhandledErrorCount: number;
}

class HealthMonitorImpl {
    private probeIntervalMs: number;
    private failureThreshold: number;
    private consecutiveFailures: number = 0;
    private lastProbeTime?: number;
    private lastError?: string;
    private unhandledErrorCount: number = 0;
    private probeIntervalId?: NodeJS.Timeout;
    private port: number = 3000;

    constructor(port: number) {
        this.port = port;
        this.probeIntervalMs = parseInt(process.env.HEALTH_PROBE_INTERVAL_MS || '10000', 10);
        this.failureThreshold = parseInt(process.env.HEALTH_PROBE_FAILURE_THRESHOLD || '3', 10);
    }

    public start() {
        logger.info('Starting health monitor', {
            metaData: {
                probeIntervalMs: this.probeIntervalMs,
                failureThreshold: this.failureThreshold,
            },
        });

        // Run first probe immediately
        this.probe();

        // Then set up interval
        this.probeIntervalId = setInterval(() => this.probe(), this.probeIntervalMs);
    }

    public stop() {
        if (this.probeIntervalId) {
            clearInterval(this.probeIntervalId);
            this.probeIntervalId = undefined;
        }
        logger.info('Health monitor stopped');
    }

    public isHealthy(): boolean {
        return this.consecutiveFailures < this.failureThreshold;
    }

    public getStatus(): HealthStatus {
        const status: HealthStatus = {
            isHealthy: this.isHealthy(),
            consecutiveFailures: this.consecutiveFailures,
            lastProbeTime: this.lastProbeTime,
            lastError: this.lastError,
            unhandledErrorCount: this.unhandledErrorCount,
        };

        // Update Prometheus metrics
        updateHealthMetrics(status.isHealthy, this.consecutiveFailures);

        return status;
    }

    public recordUnhandledError() {
        this.unhandledErrorCount++;
    }

    private async probe() {
        try {
            const url = `http://localhost:${this.port}/api/internal/health-probe`;
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const res = await fetch(url, {
                signal: controller.signal,
            });

            clearTimeout(timeoutId);
            this.lastProbeTime = Date.now();

            if (res.ok) {
                this.consecutiveFailures = 0;
                this.lastError = undefined;
                logger.debug('Health probe succeeded');
            } else {
                this.consecutiveFailures++;
                this.lastError = `HTTP ${res.status}`;
                logger.warn(`Health probe failed: ${res.status}`, {
                    metaData: {
                        consecutiveFailures: this.consecutiveFailures,
                        threshold: this.failureThreshold,
                    },
                });
            }
        } catch (error: any) {
            this.consecutiveFailures++;
            this.lastError = error?.message || 'Unknown error';
            logger.warn('Health probe error', {
                error,
                metaData: {
                    consecutiveFailures: this.consecutiveFailures,
                    threshold: this.failureThreshold,
                },
            });
        }
    }
}

let instance: HealthMonitorImpl | null = null;

export function initHealthMonitor(port: number): HealthMonitorImpl {
    if (instance) {
        logger.warn('Health monitor already initialized');
        return instance;
    }

    instance = new HealthMonitorImpl(port);
    instance.start();
    return instance;
}

export function getHealthMonitor(): HealthMonitorImpl {
    if (!instance) {
        throw new Error('Health monitor not initialized');
    }
    return instance;
}
