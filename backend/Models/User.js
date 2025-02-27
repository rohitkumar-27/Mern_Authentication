const { required } = require('joi');
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name:{
        type:String,
        required: true   
    },
    email:{
        type:String, 
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
});

// for save the email in only lowercase format
UserSchema.pre('save', function (next) {
    this.email = this.email.toLowerCase();
    next();
  });


const UserModel = mongoose.model('users', UserSchema)
// here is 'users' name which is  described in collection name in database

module.exports = UserModel;