var router = require('express').Router(),   
    blogController = require('../controllers/blogController');

    // middleware auth
    auth = require('../middleware/is-auth'),
    verifyToken = require('../middleware/jwt-route-auth'),
    admin = require('../middleware/is-admin');

// admin route 
// restricted API
// GET /api/blog
router.get('/blog', auth, verifyToken, admin, blogController.blog);

module.exports = router;