var router = require('express').Router(),   

    // controllers    
    registerController = require('../controllers/registerController'),
    
    // middleware auth
    verifyToken = require('../middleware/jwt-route-auth');


// POST /user/login
router.post('/login', verifyToken, registerController.login);

// POST /user/register
router.post('/register', registerController.register);

// POST /user/logout
router.post('/logout', registerController.logout);

module.exports = router