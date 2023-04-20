const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    firstName: String,
    email: String,
    phone: String,
    userType:String,
    dob:String,
    address:String,
    city:String,
    zip:String,
    isDeleted:{
      type:Boolean,
      default:false
    },
    deletedAt:{
      type:Date
    }
  },{timestamps:true});

  module.exports = mongoose.model("User",UserSchema)