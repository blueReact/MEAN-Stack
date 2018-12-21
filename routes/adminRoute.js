var router = require('express').Router(),   
    blogController = require('../controllers/blogController');

    // authentication    
    auth = require('../middleware/is-auth');
    admin = require('../middleware/is-admin');

// admin route 
router.post('/blog', auth, admin, blogController.blog);

module.exports = router;