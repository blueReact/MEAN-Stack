'use strict';

var router = require('express').Router(),   
    admin = require('../controllers/admin'),

    // middleware auth
    auth = require('../middleware/is-auth'),
    verifyToken = require('../middleware/jwt-route-auth'),
    adminAuth = require('../middleware/is-admin');

// admin route 
// restricted API
// GET /api/blog
// router.get('/blog', auth, verifyToken, adminAuth, admin.blog);

router.post('/blog', auth, verifyToken, adminAuth, admin.blogPost);
router.get('/blog', admin.blogGetList);
router.get('/blog/:id', admin.blogGetOne);
router.put('/blog',auth, verifyToken, adminAuth, admin.blogPutOne);
router.delete('/blog',auth, verifyToken, adminAuth, admin.deletePost);

module.exports = router;