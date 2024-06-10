const { createLogger, format, transports, addColors } = require('winston');

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    success: 2,
    info: 3
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    success: 'green',
    info: 'blue'
  }
};

addColors(customLevels.colors);

const logger = createLogger({
  levels: customLevels.levels,
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} - ${level.toUpperCase()} - ${message}`)
  ),
  transports: [
    new transports.Console({ level: 'info', format: format.combine(format.colorize(), format.simple()) }),
    new transports.File({ filename: 'logfile.log', level: 'info' })
  ]
});

module.exports = logger;
