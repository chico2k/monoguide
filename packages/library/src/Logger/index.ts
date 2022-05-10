import { createLogger, format, transports } from 'winston';

const { combine, timestamp, prettyPrint, colorize, errors } = format;

const Logger = createLogger({
  level: 'info',
  format: format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  Logger.add(
    new transports.Console({
      format: combine(
        errors({ stack: true }), // <-- use errors format
        colorize(),
        timestamp(),
        prettyPrint()
      )
    })
  );
}

export { Logger };
