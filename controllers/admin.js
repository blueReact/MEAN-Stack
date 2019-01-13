'use strict';

// admin
var jwt = require('jsonwebtoken');
var registerUser = require('../models/registerModel');

// admin protected route
module.exports.blog = function (req, res) {

    /* res.status(200).json({
        "message": "protected admin route"
    }); */


    jwt.verify(req.token, process.env.JWT_KEY, function (err, authData) {

        if (err)
            res.status(403).json(err)

        else
            // res.status(200).json({
            //     "message": "protected admin route",
            //     "authData": authData
            // });

            // custom query 
            var query = {
                admin: {
                    $eq: false // $eq is a comparison operator
                }
            }

            var pageNumber = 2;
            var pageSize = 5;

            registerUser
                .find(query)
                .skip((pageNumber-1)*pageSize)
                .sort({ 'createdAt': 1}) // 1 => old to new  && -1 => new to old
                // .sort(username) // sorts name a-z in that order
                // .sort({'username': -1}) // sorts name in reverse order
                .limit(pageSize)
                .exec()
                .then( function(result) {
                    res.status(200).json({
                        "message": "success",
                        "authData": result
                    });
                })
                .catch(function(err){

                    res.status(200).json({
                        "message": "failed!",
                        "authData": err
                    });

                })

    });
}