var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var loginSchema = new Schema({
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
    }
});


module.exports = mongoose.model('loginCollection', loginSchema);

