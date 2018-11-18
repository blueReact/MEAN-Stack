var router = require('express').Router(),
    verifyToken = require('../middleware/jwt-route-auth'),
    
    // controller
    controllerApi = require('../controllers/controller');

   
router.post('/api', verifyToken, controllerApi.restrictedApi);
router.post('/api/login', controllerApi.login);
router.get('/data', verifyToken, controllerApi.data);

module.exports = router