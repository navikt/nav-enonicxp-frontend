import pino, { LoggerOptions } from 'pino';

const options: LoggerOptions =
    process.env.ENV === 'localhost'
        ? {
              level: 'debug',
              base: {},
              transport: {
                  target: 'pino-pretty',
                  options: {
                      colorize: true,
                  },
              },
          }
        : {};

export const logger = pino(options);
