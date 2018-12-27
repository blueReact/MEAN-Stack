'use strict';

// admin
var jwt = require('jsonwebtoken');

// admin protected route
module.exports.blog = function (req, res) {

    /* res.status(200).json({
        "message": "protected admin route"
    }); */


    jwt.verify(req.token, process.env.JWT_KEY, function (err, authData) {

        if (err)
            res.status(403).json(err)

        else
            res.status(200).json({
                "message": "protected admin route",
                "authData": authData
            });

    });
}