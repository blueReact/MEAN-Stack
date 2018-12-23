module.exports = function(req, res, next) {

    if(!req.session.isAdmin) {

        // unauthorized status 401
        res.status(401).json({
            "message": "is not admin"
        });
    }
    else {
        next();
    }

}