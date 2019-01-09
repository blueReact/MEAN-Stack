var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var registerSchema = new Schema({
    /* created: {
        type: Date,
        default: Date.now()
    },*/
    // userSession: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'userSessions'
    // },
    username: {
        type: String,
        required: true,
        trim: true
    },
    admin: {
        type: Boolean,
        default: false
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
    
},{
    // creates both createdAt and updatedAt fields
    timestamps: true
});


module.exports = mongoose.model('registerCollection', registerSchema);

