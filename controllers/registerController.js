// Register Schema

var bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  registerUser = require('../models/registerModel');


module.exports.register = function (req, res) {

  console.log('req.body ==> ', req.body);

  registerUser.findOne({
    email: req.body.email
  }).then(function (user) {
    if (user)
      res.status(401).json({
        message: 'Auth Failed'
      })
    else
      bcrypt.genSalt(12, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {

          //store hash in DB
          console.log('hash', hash);            

          registerUser.create({
              username: req.body.username,
              password: hash,
              email: (req.body.email).toLowerCase()
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
    res.send(err);
  });

}


module.exports.login = function (req, res) {
  registerUser.find({
    email: (req.body.email).toLowerCase()
  }).then(function (user) {
    bcrypt.compare((req.body.password).toLowerCase(), user[0].password, function (err, result) {
      if (err)
        console.log(err)
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
        }, process.env.JWT_KEY);

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
        res.status(401).json({
          message: 'Auth failed'
        });
      }

    });
  }).catch(function (err) {
    res.send(err);
  });

}


module.exports.logout = function (req, res) {
  
  console.log('logout' ,req)

  req.session.destroy(function(){

    res.status(555).json({
      message: 'session destroyed!!!'
    });
    
  });

}