const LOGPATH = './logs/appLogs.json';
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

module.exports = createLogger({
  format: combine( timestamp(), format.json()),
  transports: [
		new transports.Console(),
    new transports.File({ filename: LOGPATH })
  ]
});
