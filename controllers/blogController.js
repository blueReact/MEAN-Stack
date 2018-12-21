// admin protected route
module.exports.blog = function(req, res){

    res.json({
        "message": "protected admin route"
    });
    
}
