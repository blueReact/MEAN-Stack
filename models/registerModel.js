var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var registerSchema = new Schema({
    created: {
        type: Date,
        default: Date.now()
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true
    }
});


module.exports = mongoose.model('registerCollection', registerSchema);

