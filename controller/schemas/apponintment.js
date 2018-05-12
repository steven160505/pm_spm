const mongoose = require('mongoose');
const Schema = mongoose.Schema

// data:  { address: '1',
//   surburb: '1',
//   city: '1',
//   dog_breed: 'German Shepherd',
//   grooming_option: 'deluxe grooming',
//   date: '2018-05-08 04:15',
//   water: 'yes',
//   electricity: 'yes',
//   requirements: 'adsfafd' }

const AppointmentSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        unique: true,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    surburb: {
        type: String,
    },
    dogBreed: {
        type: String,
    },
    groomingOption: {
        type: String,
    },
    date:{
        type:Date,
    },
    water:{
        type:String,
    },
    electricity:{
        type:String,
    },
    requirements: {
        type: String,
    },
    createAt:{
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('apponintment', AppointmentSchema);