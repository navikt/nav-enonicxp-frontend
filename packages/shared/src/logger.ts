import pino, { LoggerOptions } from 'pino';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';

const isBuildPhase =
    typeof process.env !== 'undefined' && process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD;

const options: LoggerOptions =
    process.env.ENV === 'localhost' || isBuildPhase
        ? {
              base: {},
              transport: {
                  target: 'pino-pretty',
                  options: {
                      colorize: true,
                  },
              },
          }
        : {
              base: { buildId: process.env.BUILD_ID },
              formatters: {
                  level: (label) => {
                      return { level: label };
                  },
              },
          };

const pinoInstance = pino(options);

type LogContext = {
    error?: any;
    metaData?: any;
};

type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'trace' | 'fatal';

const isClient = typeof window !== 'undefined';

const createLogMethod = (level: LogLevel) => {
    return (message: string, context?: LogContext) => {
        if (isClient) {
            // Client-side: log as "[level] message" followed by the raw object for expandability
            // Map pino levels to console methods
            const consoleLevel = level === 'fatal' ? 'error' : level === 'trace' ? 'debug' : level;
            const consoleMethod = (console[consoleLevel as keyof Console] as any) || console.log;
            const prefixedMessage = `[${level}] ${message}`;

            if (context?.error || context?.metaData) {
                consoleMethod(prefixedMessage, context);
            } else {
                consoleMethod(prefixedMessage);
            }
        } else {
            // Server-side: use pino with JSON.stringify for OpenSearch compatibility
            const logObject: Record<string, any> = { message };

            if (context?.error) {
                logObject.error = JSON.stringify(
                    context.error,
                    Object.getOwnPropertyNames(context.error)
                );
            }

            if (context?.metaData) {
                logObject.metaData = JSON.stringify(context.metaData);
            }

            pinoInstance[level](logObject);
        }
    };
};

export const logger = {
    info: createLogMethod('info'),
    warn: createLogMethod('warn'),
    error: createLogMethod('error'),
    debug: createLogMethod('debug'),
    trace: createLogMethod('trace'),
    fatal: createLogMethod('fatal'),
};
