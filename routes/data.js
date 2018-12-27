'use strict';

var router = require('express').Router(),
    
    // controllers   
    controllerApi = require('../controllers/controller'),

    // middleware auth
    auth = require('../middleware/is-auth'),
    verifyToken = require('../middleware/jwt-route-auth');


// restricted API
router.get('/data', auth, verifyToken, controllerApi.data);

module.exports = router