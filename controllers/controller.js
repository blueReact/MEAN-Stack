'use strict';

//controller
var jwt = require('jsonwebtoken');
var config = require('config')

module.exports.data = function (req, res) {

  jwt.verify(req.token, config.get('JWT_KEY'), function (err, authData) {

    if (err)
      res.status(403).json(err)
    else
      
      res.json({
        authData: authData
      })

  });
}