var jwt = require('jsonwebtoken'),

  // login Schema
  loginUser = require('../models/login');

module.exports.login = function (req, res) {

  // var user = {
  // username: req.body.username,
  // password: req.body.password
  // }

  var user = new loginUser();

  user.username = req.body.username;
  user.password = req.body.password;

  jwt.sign({
    user: user
  }, process.env.JWT_KEY, function (err, token) {

    user.save().then(function (result) {

        // created successfully
        res.status(201).json({
          token: token
        });

      })
      .catch(function (err) {
        res.send(err);
      });

  });

}


module.exports.restrictedApi = function (req, res) {

  jwt.verify(req.token, process.env.JWT_KEY, function (err, authData) {

    if (err)
      res.status(403).json(err)
    else
      res.status(200).json({
        "message": "Welcome to the restricted API",
        "authData": authData
      });

  });
}


module.exports.data = function (req, res) {

  jwt.verify(req.token, process.env.JWT_KEY, function (err, authData) {

    if (err)
      res.status(403).json(err)
    else
      res.status(200).json({
        "message": "Welcome to the restricted data API",
        "authData": authData
      });

  });
}