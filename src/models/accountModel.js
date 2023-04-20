const mongoose = require('mongoose');
const ObjectId= mongoose.Schema.Types.ObjectId


const UserAccountSchema = new mongoose.Schema({
    account_name:String,
    account_type:String,
    userId:{
      type:ObjectId,
      ref:"User"
    },
     isDeleted:{
      type:Boolean,
      default:false
    },
    deletedAt:{
      type:Date
    }
  },{timestamps:true});

  module.exports = mongoose.model("Account",UserAccountSchema)