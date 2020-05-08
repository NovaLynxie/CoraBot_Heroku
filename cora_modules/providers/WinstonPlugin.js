const winston = require('winston'); require('winston-daily-rotate-file');
const {addColors, createLogger, format, transports} = winston
const {combine, colorize, errors, json, timestamp, printf} = format;
// Logging Levels

const customLevels = {
  levels: {
    silly: 0, 
    info: 1,
    data: 2,
    warn: 3,
    error: 4,
    debug: 5,
    verbose: 6,
  },
  colors: {
    silly: 'grey',
    info: 'green',
    data: 'cyan',
    warn: 'yellow',
    error: 'red',
    debug: 'blue',
    verbose: 'magenta'
  }
};

addColors(customLevels.colors);

const logger = createLogger({
  levels: customLevels.levels,
    format: combine(
      timestamp({format: 'DD-MM-YYYY HH:mm:ss ZZ'}),
      printf(info => `(${info.timestamp}) [${info.level}] ${info.message}`),
      errors({stack: true}),
  ),
  transports: [
    // Console transport created here.
    new transports.Console({
      level: 'verbose',
      format: combine(
        colorize(),
        errors({stack: true,}),
        timestamp({format: 'HH:mm:ss'}),
        printf(info => `(${info.timestamp}) [${info.level}] ${info.message}`),
      ),
      handleExceptions: true
    }),
    // Log file transports created here.
    new transports.DailyRotateFile({ // Requires winston-daily-rotate-file to work.
      filename: './bot_logs/%DATE%-latest.log',
      datePattern: 'DD-MM-YYYY',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'error',
      format: combine(
        timestamp({format: 'DD-MM-YYYY HH:mm:ss ZZ'}),
        printf(info => `(${info.timestamp}) [${info.level}] ${info.message}`),
        errors({stack: true}),
      )
    }),
    new transports.DailyRotateFile({ // Requires winston-daily-rotate-file to work.
      filename: './bot_logs/%DATE%-debug.log',
      datePattern: 'DD-MM-YYYY',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'debug',
      format: combine(
        timestamp({format: 'DD-MM-YYYY HH:mm:ss ZZ'}),
        printf(info => `(${info.timestamp}) [${info.level}] ${info.message}`),
        errors({stack: true}),
      )
    })
    /* Disabled to allow dated log files.
    new transports.File({
      filename: './bot_logs/debug.log',
      level: 'debug',
      format: combine(
        timestamp({format: 'DD-MM-YYYY HH:mm:ss ZZ'}),
        printf(info => `(${info.timestamp}) [${info.level}] ${info.message}`),
        errors({stack: true}),
      )
    }),
    new transports.File({
      filename: './bot_logs/latest.log',
      level: 'error',
      format: combine(
        timestamp({format: 'DD-MM-YYYY HH:mm:ss ZZ'}),
        printf(info => `(${info.timestamp}) [${info.level}] ${info.message}`),
        errors({stack: true}),
      )
    })
    */
    //logFileLatest, //Testing secondary transport systems.
    //logFileDebug //Testing secondary transport systems.
  ],
});

module.exports = logger;