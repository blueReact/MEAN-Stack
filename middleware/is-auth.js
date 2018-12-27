'use strict';

module.exports = function(req, res, next) {
    
    if(!req.session.isLoggedIn) {

        // unauthorized status 401
        res.status(401).json({
            "message": "is not logged in"
        });
    }
    else {
        next();
    }

}