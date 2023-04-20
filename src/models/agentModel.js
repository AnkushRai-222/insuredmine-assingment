const mongoose = require('mongoose');
const ObjectId= mongoose.Schema.Types.ObjectId

const AgentSchema = new mongoose.Schema({
   agentName:String,
   userId:{
      type:ObjectId,
      ref:"User"
    }

  },{timestamps:true});

  module.exports = mongoose.model("Agent",AgentSchema)