import { getHealthMonitor } from './health-monitor';
import { logger } from '@/shared/logger';

type FatalProcessErrorType = 'uncaughtException';

export type FatalProcessError = {
    type: FatalProcessErrorType;
    error: unknown;
};

export function initFatalProcessErrorHandling(
    onFatalError: (fatalError: FatalProcessError) => void
) {
    let fatalErrorHandled = false;

    const handleFatalProcessError = (type: FatalProcessErrorType, error: unknown) => {
        logger.error(`Fatal process error: ${type}`, { error });
        getHealthMonitor()?.recordProcessError();

        if (fatalErrorHandled) {
            return;
        }

        fatalErrorHandled = true;
        onFatalError({ type, error });
    };

    process.on('uncaughtException', (error) => {
        handleFatalProcessError('uncaughtException', error);
    });

    logger.info('Process health tracking initialized');
}
