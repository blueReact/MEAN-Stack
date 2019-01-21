'use strict';

var router = require('express').Router(),
    
    // controllers   
    controllerApi = require('../controllers/controller'),

    // middleware auth
    auth = require('../middleware/is-auth'),
    verifyToken = require('../middleware/jwt-route-auth');


// restricted API
router.post('/detail', auth, verifyToken, controllerApi.detail);

module.exports = router