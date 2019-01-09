var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sampleModelSchema = new Schema({    
    username: {
        type: String
    }    
},{
    // creates both createdAt and updatedAt fields
    timestamps: true
});


module.exports = mongoose.model('SampleModel', sampleModelSchema);

