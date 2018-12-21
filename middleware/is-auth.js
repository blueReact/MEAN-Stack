module.exports = function(req, res, next) {
    
    if(!req.session.isLoggedIn) {

        res.json({
            "message": "is not logged in"
        });
    }
    else {
        next();
    }

}