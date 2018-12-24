// Register Schema

var bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  registerUser = require('../models/registerModel'),
  {
    validationResult
  } = require('express-validator/check');


module.exports.register = function (req, res, next) {

  console.log('req.body ==> ', req.body);

  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }

  registerUser.findOne({
    email: req.body.email
  }).then(function (user) {

    if (user) {

      // if you want to send specific error and handle it here
      // then this approach
      /* res.status(401).json({
        message: 'Auth Failed'
      })*/


      var err = new Error("Authentication Failed");
      err.code = 401;

      // pass it to catch block via throw
      // throw err;

      // or pass to next error handling middleware
      next(err);

    } else
      bcrypt.genSalt(12, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {

          //store hash in DB
          console.log('hash', hash);
          var email = req.body.email.toLowerCase()
          registerUser.create({
              username: req.body.username,
              password: hash,
              email: email
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
        });
      });
  }).catch(function (err) {
    // res.send(err);

    // scalable and customizable approach 
    // for catching errors inside catch block    
    var err = new Error(err);
    err.code = 500;
    err.message = 'Registration failed';

    // passing it to next middleware with err object
    return next(err);

  });

}

module.exports.login = function (req, res, next) {

  var password = req.body.password.toLowerCase();

  // express validator
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }

  registerUser.find({
    email: (req.body.email).toLowerCase()
  }).then(function (user) {
    bcrypt.compare(password, user[0].password, function (err, result) {
      if (err) {

        // console.log(err);

        // scalable and customizable approach 
        // for catching errors inside catch block 
        var err = new Error(err);
        err.code = 500;
        err.message = 'Server failed';

        // passing it to next catch block 
        throw err;

      }

      if (result) {

        // creating a session varibale on the client side with boolean value for now
        // not suing it in the client side yet
        // just a demo to create session variable
        // it writes to client side localstorage
        req.session.isLoggedIn = true;

        // setting in the localstorage
        req.session.isAdmin = user[0].admin;

        var token = jwt.sign({
          email: user[0].email,
          userId: user[0]._id
        }, process.env.JWT_KEY, { expiresIn: '1h' }); // Adds extra security => { expiresIn: '1h' } || { algorithm: 'HS512' }

        // setting a cookie with the useranme after succesfull login
        res.cookie('username', user[0].username);

        // logged in successfully
        res.status(200).json({
          message: 'Auth successfull',
          token: token,
          admin: user[0].admin,
          isLoggedIn: true
        });

      } else {

        // never share why it failed
        // security
        return res.status(401).json({
          message: 'Auth failed'
        });
      }

    });
  }).catch(function (err) {

    // shorthand error handler
    // res.send(err); 

    // another kind but repetitive
    /*    
    return res.status(500).json({
      errorMessage: 'Database operation failed'
    }); 
    */

    // scalable and customizable approach 
    // for catching errors inside catch block 
    var err = new Error(err);
    err.code = 500;
    err.message = 'Login failed';

    // passing it to next middleware with err object
    return next(err);

  });

}

module.exports.logout = function (req, res) {

  console.log('logout', req)

  req.session.destroy(function () {

    res.status(555).json({
      message: 'session destroyed!!!'
    });

  });

}