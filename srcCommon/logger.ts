import pino, { LoggerOptions } from 'pino';

const options: LoggerOptions =
    process.env.ENV === 'localhost'
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
