'use strict';

// admin
var jwt = require('jsonwebtoken');
var registerUser = require('../models/registerModel');
var blogUser = require('../models/blogModel');
var ent = require('ent');

var config = require('config');

// admin protected route
// module.exports.blog = function (req, res) {

//   /* res.status(200).json({
//       "message": "protected admin route"
//   }); */

//   jwt.verify(req.token, config.get('JWT_KEY'), function (err, authData) {

//     if (err)
//       res.status(403).json(err)

//     else
//       // res.status(200).json({
//       //     "message": "protected admin route",
//       //     "authData": authData
//       // });

//       // custom query 
//       var query = {
//         admin: {
//           $eq: false // $eq is a comparison operator
//         }
//       }

//     // var pageNumber = 2;
//     // var pageSize = 5;

//     registerUser
//       .find(query)
//       //.skip((pageNumber-1)*pageSize)
//       .sort({
//         'createdAt': 1
//       }) // 1 => old to new  && -1 => new to old
//       // .sort(username) // sorts name a-z in that order
//       // .sort({'username': -1}) // sorts name in reverse order
//       //.limit(pageSize)
//       .exec()
//       .then(function (result) {
//         res.status(200).json({
//           "message": "success",
//           "authData": result
//         });
//       })
//       .catch(function (err) {

//         res.status(200).json({
//           "message": "failed!",
//           "authData": err
//         });

//       })

//   });
// };

module.exports.blogPost = function (req, res, next) {


  console.log(req.body);

  // title: req.body.admin.title,
  //     description: req.body.admin.description,

  blogUser.create({
      title: req.body.title,
      description: req.body.description,
      blog: ent.encode(req.body.blog)
    })
    .then(function (result) {

      // created successfully
      res.status(201).json({
        result: result
      });

    })
    .catch(function (err) {
      res.send(err);
    });

};

module.exports.blogGetList = function (req, res, next) {


  blogUser.find()
    .then(function (result) {

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

      // fetched successfully
      res.status(200).json({
        result: temp
      });

    })
    .catch(function (err) {
      res.send(err);
    });

};


module.exports.blogGetOne = function (req, res, next) {
  jwt.verify(req.token, config.get('JWT_KEY'), function (err, authData) {

    console.log(req.params.id);

    blogUser.find({
      _id: req.params.id
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

        // fetched successfully
        res.status(200).json({
          result: temp
        });

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

module.exports.blogPutOne = function (req, res, next) {
  jwt.verify(req.token, config.get('JWT_KEY'), function (err, authData) { 


  blogUser.update({
      "title": req.body.title,
      "description": req.body.description,
      "blog": ent.encode(req.body.blog)
    
  }).then(function (result) {

    if (err) {
      console.log("Something wrong when updating data!");
      
    }
    res.json({
      message: result
    });
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

module.exports.deletePost = function (req, res, next) {

  jwt.verify(req.token, config.get('JWT_KEY'), function (err, authData) {

    blogUser.findByIdAndRemove(req.body.id).then(function (result) {

      if (err)
        res.send(err);
      else
        res.json({
          message: 'Blog Deleted!'
        });
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