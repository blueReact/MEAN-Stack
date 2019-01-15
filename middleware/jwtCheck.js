
const config = require('config');
module.exports = function(req, res, next) {
  if(!config.get('JWT_KEY')){
    console.log('FATAL ERROR: JWT key is not defined!!!');
    process.exit(1);
  }
}