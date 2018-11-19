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
          console.log('hash', hash)

          registerUser.create({
              username: req.body.username,
              password: hash,
              email: req.body.email
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
    email: req.body.email
  }).then(function (user) {
    bcrypt.compare(req.body.password, user[0].password, function (err, result) {
      if (err)
        console.log(err)
      if (result) {
        var token = jwt.sign({
          email: user[0].email,
          userId: user[0]._id
        }, process.env.JWT_KEY);

        res.status(200).json({
          message: 'Auth successfull',
          token: token
        });
      } else {
        // nevewr share why it failed
        res.status(401).json({
          message: 'Auth failed'
        });
      }

    });
  }).catch(function (err) {
    res.send(err);
  });

}