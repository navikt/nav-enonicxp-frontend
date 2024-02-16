import pino, { LoggerOptions } from 'pino';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';

const options: LoggerOptions =
    process.env.ENV === 'localhost' ||
    process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD
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

export const logger = pino(options);
