"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston_1 = require("winston");
const { combine, timestamp, prettyPrint, colorize, errors } = winston_1.format;
const Logger = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston_1.transports.File({ filename: 'error.log', level: 'error' }),
        new winston_1.transports.File({ filename: 'combined.log' })
    ]
});
exports.Logger = Logger;
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    Logger.add(new winston_1.transports.Console({
        format: combine(errors({ stack: true }), // <-- use errors format
        colorize(), timestamp(), prettyPrint())
    }));
}
//# sourceMappingURL=index.js.map