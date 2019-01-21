'use strict';

//controller
var jwt = require('jsonwebtoken');
var config = require('config');
var ent = require('ent');

var blogModel = require('../models/blogModel');

module.exports.detail = function (req, res, next) {

  jwt.verify(req.token, config.get('JWT_KEY'), function (err, authData) {

    // err block;
    console.log(req.body);

    blogModel.find({
      _id: req.body.blog
    }).then(function (result) {

      console.log(result);

      if (result) {

        var temp = [];
        for (var i = 0; i < result.length; i++) {
          var object = {};

          object._id = result[i]._id;
          object.title = result[i].title;
          object.description = result[i].description;
          object.decode = ent.decode(result[i].blog);
          object.createdAt = result[i].createdAt;

          temp.push(object);
        }

        res.status(200).json({
          result: temp
        });

      } else {

        // never share why it failed
        // security
        var err = new Error(err);
        err.code = 404;
        err.message = 'File not found!';

        // passing it to next middleware with err object
        return next(err);

      }

    }).catch(function (err) {


      // scalable and customizable approach 
      // for catching errors inside catch block 
      var err = new Error(err);
      err.code = 500;
      err.message = 'Internal Server Error';

      // passing it to next middleware with err object
      return next(err);

    });
  });

};




