import pino, { LoggerOptions } from 'pino';

const commonOptions: LoggerOptions = {
    base: { context: 'custom-server' },
};

const options: LoggerOptions =
    process.env.ENV === 'localhost'
        ? {
              ...commonOptions,
              level: 'debug',
              base: {},
              transport: {
                  target: 'pino-pretty',
                  options: {
                      colorize: true,
                  },
              },
          }
        : {
              ...commonOptions,
              base: { ...commonOptions.base, pid: process.pid },
          };

export const logger = pino(options);
