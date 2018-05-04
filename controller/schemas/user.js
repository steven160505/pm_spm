const mongoose = require('mongoose');
const Schema = mongoose.Schema
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    homeAddress: {
        type: String,
        unique: true,
        require: true
    },
    phone:{
        type:String,
    }
    email: {
        type: String,
    }
});

module.exports = mongoose.model('User', UserSchema);