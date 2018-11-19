var router = require('express').Router(),
    verifyToken = require('../middleware/jwt-route-auth'),

    // controllers
    loginController = require('../controllers/registerController'),
    controllerApi = require('../controllers/controller');

// login for new user
router.post('/login', loginController.login);

// restricted API
router.get('/data', verifyToken, controllerApi.data);

module.exports = router