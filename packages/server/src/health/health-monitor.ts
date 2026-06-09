import { logger } from '@/shared/logger';
import { healthProbeFailuresCounter, healthStatusGauge } from './health-metrics';

export interface HealthStatus {
    isHealthy: boolean;
    probeOk: boolean;
    lastProbeTime?: number;
    lastError: string | null;
    processErrorCount: number;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class HealthMonitor {
    private startupDelayMs: number = 30000;
    private probeIntervalMs: number = 10000;
    private probeOk: boolean = true;
    private isProbing: boolean = false;
    private isActive: boolean = false;
    private port: number;

    // Used for metrics to Prometheus (see health-metrics.ts)
    private processErrorCount: number = 0;
    private lastProbeTime?: number;
    private lastError: string | null = null;
    private probeIntervalId?: NodeJS.Timeout;

    constructor(port: number) {
        this.port = port;
    }

    public async start() {
        await wait(this.startupDelayMs);
        this.probeIntervalId = setInterval(() => this.probe(), this.probeIntervalMs);
        this.isActive = true;
    }

    public stop() {
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
        return this.probeOk;
    }

    public getStatus(): HealthStatus {
        return {
            isHealthy: this.isHealthy(),
            probeOk: this.probeOk,
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
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        try {
            const url = `http://localhost:${this.port}/internal/health-render`;
            const res = await fetch(url, { signal: controller.signal, redirect: 'manual' });

            this.lastProbeTime = Date.now();

            if (res.ok) {
                if (!this.probeOk) {
                    logger.info('Health probe recovered from error');
                }
                this.probeOk = true;
                this.lastError = null;
            } else {
                this.probeOk = false;
                this.lastError = `HTTP ${res.status}`;
                healthProbeFailuresCounter.inc();
                logger.warn(`Health probe failed: ${res.status}`, {
                    metaData: { url },
                });
            }
        } catch (error: unknown) {
            this.probeOk = false;
            this.lastError = error instanceof Error ? error.message : 'Unknown error';
            healthProbeFailuresCounter.inc();
            logger.warn('Health probe error', {
                error,
                metaData: { url: `http://localhost:${this.port}/internal/health-render` },
            });
        } finally {
            clearTimeout(timeoutId);
            this.isProbing = false;
            healthStatusGauge.set(this.isHealthy() ? 1 : 0);
        }
    }
}

let instance: HealthMonitor | null = null;

export async function initHealthMonitor(port: number) {
    if (instance) {
        logger.warn('Health monitor already initialized');
    }

    instance = new HealthMonitor(port);
    await instance.start();
}

export function getHealthMonitor(): HealthMonitor | null {
    return instance;
}
