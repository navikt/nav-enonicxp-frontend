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

export const logger = pino(options);
