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

export const logger = pino({
    ...options,
    hooks: {
        // Overrides the pino logger to behave in a similar way to console.log with multiple arguments
        logMethod(args, method) {
            args.forEach((arg) => method.apply(this, [arg]));
        },
    },
});
