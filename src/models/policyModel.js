const mongoose = require('mongoose');
const ObjectId= mongoose.Schema.Types.ObjectId
const PolicySchema = new mongoose.Schema({
    policy_mode:String,
    policy_number:String,
    policy_type:String,
    policy_start_date:String,
    policy_end_date:String,
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

module.exports = mongoose.model("Policy",PolicySchema)