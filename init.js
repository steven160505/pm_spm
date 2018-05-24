// add super admin to sys
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pet-grooming');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const db = mongoose.connection;
const dbCollection = db.collections;

const User = require('./controller/schemas/user.js')
function insert() {
    let user = new User({ username: "admin1212", password: 1, role: 10 })
    user.save((error, records)=>{
      if(error){
        console.log('Failed to create an new Administrator!')
      }
      console.log('An new Administrator was created successfully!')
      console.log('using control + c to end this programmer')
    })
}

insert()