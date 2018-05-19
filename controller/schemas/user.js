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
    },
    lastname: {
        type: String,
    },
    streetname:{
        type: String,
    },
    streetnumber:{
        type: String,
    },
    city:{
        type: String,
    },
    dogname:{
        type: String,
    },
    dogbreed:{
        type: String,
    },
    dog_birth_date:{
        type: String,
    },
    homeAddress: {
        type: String,
    },
    phone:{
        type:String,
    },
    email: {
        type: String,
    },
    role:{
        type:Number,
        default:1
    }
});

module.exports = mongoose.model('User', UserSchema);