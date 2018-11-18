module.exports = function (req, res, next) {

    var bearerHeader = req.headers.authorization;

    if (typeof bearerHeader !== 'undefined' && bearerHeader !== '') {

        var bearer = bearerHeader.split(' ');
        var bearerToken = bearer[1];

        req.token = bearerToken;

        next();
    } else {
        res.status(403).json({
            "error": "forbidden route"
        });
    }
}