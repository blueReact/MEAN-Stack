var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogModelSchema = new Schema({    
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    blog: {
        type: String
    }    
},{
    // creates both createdAt and updatedAt fields
    timestamps: true
});


module.exports = mongoose.model('BlogModelSchema', blogModelSchema);

