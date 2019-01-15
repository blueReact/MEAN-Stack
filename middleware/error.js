module.exports = function (err, req, res, next) {

  var err = new Error(err);
  err.code = err.status || 500;  
  return res.status(err.code).json({
    message: err.message
  });
}