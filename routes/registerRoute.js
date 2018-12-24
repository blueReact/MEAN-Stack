var router = require('express').Router(),
    { check } = require('express-validator/check'),   

    // controllers    
    registerController = require('../controllers/registerController'),
    
    // middleware auth
    verifyToken = require('../middleware/jwt-route-auth');


// POST /user/login
router.post('/login', verifyToken, [

    // must be an email
    // trimming for white space is done in my model
    check('email').isEmail(),

    // password must be at least 5 chars long
    // trimming for white space is done in my model
    check('password').isLength({ min: 5 })

  ], registerController.login);

// POST /user/register
router.post('/register', [

    // username must be at least 5 chars long
    // trimming for white space is done in my model
    check('username').isLength({ min: 5 }),

    // must be an email
    // trimming for white space is done in my model
    check('email').isEmail(),

    // password must be at least 5 chars long
    // trimming for white space is done in my model
    check('password').isLength({ min: 5 })

  ], registerController.register);

// POST /user/logout
router.post('/logout', registerController.logout);

module.exports = router