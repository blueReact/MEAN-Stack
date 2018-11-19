var router = require('express').Router(),   

    // controllers    
    registerController = require('../controllers/registerController');

// to reigster a new user;
router.post('/api', registerController.register);

module.exports = router