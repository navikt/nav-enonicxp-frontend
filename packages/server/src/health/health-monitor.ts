import { logger } from '@/shared/logger';
import { healthProbeFailuresCounter, healthStatusGauge } from './health-metrics';

export interface HealthStatus {
    isHealthy: boolean;
    consecutiveFailures: number;
    lastProbeTime?: number;
    lastError: string | null;
    processErrorCount: number;
}

const STARTUP_DELAY_MS = 60000;

class HealthMonitorImpl {
    private probeIntervalMs: number = 10000;
    private failureThreshold: number = 3;
    private consecutiveFailures: number = 0;
    private lastProbeTime?: number;
    private lastError: string | null = null;
    private processErrorCount: number = 0;
    private processErrorThreshold: number = 5;
    private probeIntervalId?: NodeJS.Timeout;
    private startupTimeoutId?: NodeJS.Timeout;
    private isProbing: boolean = false;
    private isActive: boolean = false;
    private port: number;

    constructor(port: number) {
        this.port = port;
    }

    public start() {
        logger.info(`Health monitor: waiting ${STARTUP_DELAY_MS}ms before starting probes`);
        this.startupTimeoutId = setTimeout(() => {
            this.isActive = true;
            logger.info('Health monitor: startup delay elapsed, probing started');
            this.probeIntervalId = setInterval(() => this.probe(), this.probeIntervalMs);
        }, STARTUP_DELAY_MS);
    }

    public stop() {
        if (this.startupTimeoutId) {
            clearTimeout(this.startupTimeoutId);
            this.startupTimeoutId = undefined;
        }
        if (this.probeIntervalId) {
            clearInterval(this.probeIntervalId);
            this.probeIntervalId = undefined;
        }
        logger.info('Health monitor stopped');
    }

    public isHealthy(): boolean {
        if (!this.isActive) {
            return true;
        }
        const probeHealthy = this.consecutiveFailures < this.failureThreshold;
        const processHealthy = this.processErrorCount < this.processErrorThreshold;
        return probeHealthy && processHealthy;
    }

    public getStatus(): HealthStatus {
        return {
            isHealthy: this.isHealthy(),
            consecutiveFailures: this.consecutiveFailures,
            lastProbeTime: this.lastProbeTime,
            lastError: this.lastError,
            processErrorCount: this.processErrorCount,
        };
    }

    public recordProcessError() {
        this.processErrorCount++;
        healthStatusGauge.set(this.isHealthy() ? 1 : 0);
    }

    private async probe() {
        if (this.isProbing) {
            return;
        }

        this.isProbing = true;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        try {
            const url = `http://localhost:${this.port}/health-render`;
            logger.info(`Health probe calling: ${url}`);
            const res = await fetch(url, { signal: controller.signal, redirect: 'manual' });

            this.lastProbeTime = Date.now();
            logger.info(`Health probe response: ${res.status} ${res.statusText}`, {
                metaData: { url, status: res.status },
            });

            if (res.ok) {
                if (this.consecutiveFailures > 0) {
                    logger.info('Health probe recovered');
                }
                this.consecutiveFailures = 0;
                this.lastError = null;
            } else {
                this.consecutiveFailures++;
                this.lastError = `HTTP ${res.status}`;
                healthProbeFailuresCounter.inc();
                logger.warn(`Health probe failed: ${res.status}`, {
                    metaData: {
                        url,
                        consecutiveFailures: this.consecutiveFailures,
                        threshold: this.failureThreshold,
                    },
                });
            }
        } catch (error: unknown) {
            this.consecutiveFailures++;
            this.lastError = error instanceof Error ? error.message : 'Unknown error';
            healthProbeFailuresCounter.inc();
            logger.warn('Health probe error', {
                error,
                metaData: {
                    url: `http://localhost:${this.port}/health-render`,
                    consecutiveFailures: this.consecutiveFailures,
                    threshold: this.failureThreshold,
                },
            });
        } finally {
            clearTimeout(timeoutId);
            this.isProbing = false;
            healthStatusGauge.set(this.isHealthy() ? 1 : 0);
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

export function getHealthMonitor(): HealthMonitorImpl | null {
    return instance;
}
