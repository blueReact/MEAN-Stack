// admin protected route
module.exports.blog = function(req, res){

    res.status(200).json({
        "message": "protected admin route"
    });
    
}
