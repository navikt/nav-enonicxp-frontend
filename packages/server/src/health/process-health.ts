import { getHealthMonitor } from './health-monitor';
import { logger } from '@/shared/logger';

export function initProcessHealthTracking() {
    process.on('uncaughtException', (error) => {
        logger.error('Uncaught exception', { error });
        getHealthMonitor()?.recordProcessError();
    });

    process.on('unhandledRejection', (reason) => {
        logger.error('Unhandled promise rejection', { error: reason });
        getHealthMonitor()?.recordProcessError();
    });

    logger.info('Process health tracking initialized');
}
