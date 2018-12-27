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
router.get('/blog', auth, verifyToken, adminAuth, admin.blog);

module.exports = router;