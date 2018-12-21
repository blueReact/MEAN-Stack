var router = require('express').Router(),
    
    // controllers
    loginController = require('../controllers/registerController'),
    controllerApi = require('../controllers/controller'),

    // auth
    auth = require('../middleware/is-auth');
    verifyToken = require('../middleware/jwt-route-auth');

// login for new user
router.post('/login', verifyToken, loginController.login);

// restricted API
router.get('/data', auth, verifyToken, controllerApi.data);

module.exports = router