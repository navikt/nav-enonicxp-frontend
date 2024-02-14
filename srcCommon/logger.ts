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
              formatters: {
                  level: (label) => {
                      return { level: label };
                  },
              },
          };

export const logger = pino(options);
