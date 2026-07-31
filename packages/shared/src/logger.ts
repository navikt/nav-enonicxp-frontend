import { logger as nextLogger } from '@navikt/next-logger';

type LogContext = {
    error?: any;
    metaData?: any;
};

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const createLogMethod = (level: LogLevel) => {
    return (message: string, context?: LogContext) => {
        // @navikt/next-logger handles both server (JSON via pino) and client
        // (forwarded to /api/logger) logging, with the correct JSON shape for Nav's
        // log pipeline (e.g. "message" key, err_message/err_stack/err_type for errors).
        if (context?.error || context?.metaData) {
            nextLogger[level]({ err: context.error, metaData: context.metaData }, message);
        } else {
            nextLogger[level](message);
        }
    };
};

export const logger = {
    info: createLogMethod('info'),
    warn: createLogMethod('warn'),
    error: createLogMethod('error'),
    debug: createLogMethod('debug'),
};
