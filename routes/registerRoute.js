var router = require('express').Router(),   

    // controllers    
    registerController = require('../controllers/registerController');

// to reigster a new user;
router.post('/register/api', registerController.register);

// logout
router.post('/logout', registerController.logout);

module.exports = router