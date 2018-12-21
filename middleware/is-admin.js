module.exports = function(req, res, next) {

    if(!req.session.isAdmin) {

        res.json({
            "message": "is not admin"
        });
    }
    else {
        next();
    }

}