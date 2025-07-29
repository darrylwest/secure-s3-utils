import winston from 'winston';

export const createLogger = (verbose: boolean = false, quiet: boolean = false): winston.Logger => {
  const level = quiet ? 'error' : verbose ? 'debug' : 'info';

  return winston.createLogger({
    level,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.simple()
    ),
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level}]: ${message}`;
          })
        ),
      }),
    ],
  });
};
