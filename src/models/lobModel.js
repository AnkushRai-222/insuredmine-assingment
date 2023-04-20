const mongoose = require('mongoose');
const ObjectId= mongoose.Schema.Types.ObjectId

const LobSchema = new mongoose.Schema({
   
    category_name:String,
    userId:{
      type:ObjectId,
      ref:"User"
    }
  },{timestamps:true});


  module.exports = mongoose.model("LOB",LobSchema)