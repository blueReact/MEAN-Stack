const winston = require('winston');

// configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logfile.log'
    })
  ]
});


module.exports = function (err, req, res, next) {

  var err = new Error(err);
  err.code = err.status || 500;

  winston.error(err.message, err.code, err.message);
  logger.info(err.message, err.code, err.message);

  // var err = new Error(err);
  // err.code = err.status || 500;  
  return res.status(err.code).json({
    message: err.message
  });

}