const mongoose = require('mongoose');
const ObjectId= mongoose.Schema.Types.ObjectId

const CarreirSchema = new mongoose.Schema({
   
    company_name:String,
    userId:{
      type:ObjectId,
      ref:"User"
    }
  },{timestamps:true});


  module.exports = mongoose.model("Carreir",CarreirSchema)