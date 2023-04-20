const { isValidObjectId } = require("mongoose");
const policyModel = require("../models/policyModel");



/* ---------------------- Create Policy ----------------------- */

const createPolicy = async function(req,res){
    try{
      let data = req.body;
      if(Object.keys(data).length == 0){
        return res.status(400).send({status:false,message:"Please Provide Data"})
      }

      let { policy_mode,policy_number,policy_type,policy_start_date,policy_end_date,userId } = data
      
      if(!policy_mode){return res.status(400).send({status:false,message:"policy_mode is Required"})}
      if(!policy_number){return res.status(400).send({status:false,message:"policy_number is Required"})}
      if(!policy_type){return res.status(400).send({status:false,message:"policy_type is Required"})}
      if(!policy_start_date){return res.status(400).send({status:false,message:"policy_start_date is Required"})}
      if(!policy_end_date){return res.status(400).send({status:false,message:"policy_end_date is Required"})}
      if(!userId){return res.status(400).send({status:false,message:"userId is Required"})}
      

       if(!isValidObjectId(userId)){
        return res.status(400).send({status:false,message:"userId is Not valid"})
       }

         let saveData = await policyModel.create(data)
         return res.status(201).send({status:true,message:"Policy created SuccessFuly",data:saveData})
    }
    catch(err){
        return res.status(500).send({ status: false, msg: err.message });
    }
}

/* --------------------------- Get Policy --------------------*/
const getPolicy = async function (req, res) {
    try {
      const policyId = req.params.policyId;
  
      if (!isValidObjectId(policyId)) { return res.status(400).send({ status: false, message: "Please provide a valid policyId" }); }
  
      let policyData = await policyModel.findOne({ _id: policyId,isDeleted:false})
  
      if (!policyData) { return res.status(404).send({ status: false, message: "policy not found" }); }
  
      return res.status(200).send({ status: true, message: "policy details", data: policyData });
  
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message })
    }
  }

/* --------------------------  Update Policy ------------------- */
const updatePolicy = async function(req,res){
    try{
        const policyId = req.params.policyId;
        if (!isValidObjectId(policyId)) { return res.status(400).send({ status: false, message: "Please provide a valid policyId" }); }
    
        let data = req.body
        let { policy_mode,policy_number,policy_type,policy_start_date,policy_end_date,userId } = data
        let updatequery = {}

        if(policy_mode){
            updatequery.policy_mode = policy_mode
        }
        
        if(policy_number){
            updatequery.policy_number = policy_number
        }
        if(policy_type){
          updatequery.policy_type = policy_type
        }
        if(policy_start_date){
             updatequery.policy_start_date = policy_start_date
        }
        if(policy_end_date){
            updatequery.policy_end_date = policy_end_date
        }
        if(userId){
            updatequery.userId = userId
        }
        const policydata = await policyModel.findOneAndUpdate({ _id: policyId },{$set:updatequery},{new:true});

        return res.status(200).send({ status: true, message: " Policy updated", data: policydata });
    }
    catch(err){
        return res.status(500).send({ status: false, message: err.message })
    }
  }

  /* ------------------------------- Delete Policy ------------------- */

  const deletePolicy = async function (req, res) {
    try {
        const policyId = req.params.policyId;
      if (!isValidObjectId(policyId)) { return res.status(400).send({ status: false, message: ' policyId is  not  valid ' }) }
      
      let policyData = await policyModel.findOne({_id:policyId,isDeleted:false})
      if (!policyData) { return res.status(404).send({ status: false, message: "account not Found" }) }
      
    //   await policyModel.deleteOne({_id:policyId})
      await policyModel.findOneAndUpdate({ _id: policyId }, { $set: { isDeleted: true, deletedAt: new Date() } })
      return res.status(200).send({ status: true, message: "Policy is sucessfully deleted" })
    }
    catch (err) {
      return res.status(500).send({ status: false, msg: err.message });
    }
  }

  module.exports = {createPolicy,getPolicy,updatePolicy,deletePolicy}