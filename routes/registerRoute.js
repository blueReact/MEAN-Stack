var router = require('express').Router(),
  {
    check
  } = require('express-validator/check'),

  // controllers    
  registerController = require('../controllers/registerController'),

  // middleware auth
  verifyToken = require('../middleware/jwt-route-auth');


// POST /user/login
router.post('/login', verifyToken, [

  // must be an email
  // trimming for white space is done in my model
  check('email').isEmail().withMessage("Please enter a valid email"),

  // password must be at least 5 chars long
  // trimming for white space is done in my model
  check('password').isLength({
    min: 5
  }).withMessage("Password must be 5 characters long")

], registerController.login);

// POST /user/register
router.post('/register', [

  // username must be at least 5 chars long
  // trimming for white space is done in my model
  check('username').isLength({
    min: 5
  }).withMessage("Password must be 5 characters long"),

  // must be an email
  // trimming for white space is done in my model
  check('email').isEmail().withMessage("Please enter a valid email"),

  // password must be at least 5 chars long
  // trimming for white space is done in my model
  check('password').isLength({
    min: 5
  }).withMessage("Password must be 5 characters long")

], registerController.register);

// POST /user/reset
router.post('/reset', verifyToken, [
  
  // password must be at least 5 chars long
  // trimming for white space is done in my model
  check('password').isLength({
    min: 5
  }).withMessage("Password must be 5 characters long")

  .not().isEmpty().withMessage("Password field cannot be empty")

], registerController.reset);

// POST /user/logout
router.post('/logout', registerController.logout);

module.exports = router