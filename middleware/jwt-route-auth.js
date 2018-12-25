module.exports = function (req, res, next) {

    var bearerHeader = req.headers.authorization;
    // console.log('middleware token', bearerHeader)

    if (typeof bearerHeader !== 'undefined' && bearerHeader !== '') {

        var bearer = bearerHeader.split(' ');
        var bearerToken = bearer[1];

        req.token = bearerToken;

        next();
    } else {

        /*res.status(403).json({
            "error": "forbidden route"
        });*/

        // scalable and customizable approach 
        var err = new Error(err);
        err.code = 403;
        err.message = 'Forbidden route';

        // passing it to next middleware with err object
        return next(err);
    }
}