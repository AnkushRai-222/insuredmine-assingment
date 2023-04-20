

const { isValidObjectId } = require("mongoose");
const accountModel = require("../models/accountModel")

/* -------------------------- Create Account---------------------- */

const createAccount = async function(req,res){
    try{
     let data = req.body;
     if(Object.keys(data).length == 0){
        return res.status(400).send({status:false,message:"Please Provide Data"})
    }

    let { account_name,account_type,userId} = data
    if(!account_name){
        return res.status(400).send({status:false,message:"account_name is required"})
    }
    if(!account_type){
        return res.status(400).send({status:false,message:"account_type is required"})
    }
    if(!userId){
        return res.status(400).send({status:false,message:"userId is required"})
    }

    if(!isValidObjectId(userId)){
        return res.status(400).send({status:false,message:"userId is not valid"})
    }

      let saveData = await accountModel.create(data)

      return res.status(200).send({status:true,message:"Account Created successfully",data:saveData})
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

/* ------------------------- GET Account ----------------------------- */
const getAccount = async function (req, res) {
    try {
      const accountId = req.params.accountId;
  
      if (!isValidObjectId(accountId)) { return res.status(400).send({ status: false, message: "Please provide a valid accountId" }); }
  
      let accountData = await accountModel.findOne({ _id: accountId ,isDeleted:false })
  
      if (!accountData) { return res.status(404).send({ status: false, message: "Account not found" }); }
  
      return res.status(200).send({ status: true, message: "Acoount details", data: accountData });
  
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message })
    }
  }

  /* ------------------------------ UPDATE Account ----------------------------------- */
  const updateAccount = async function(req,res){
    try{
        const accountId = req.params.accountId;
        if (!isValidObjectId(accountId)) { return res.status(400).send({ status: false, message: "Please provide a valid accountId" }); }
    
        let data = req.body
        let { account_name,account_type,userId} = data
        let updatequery = {}

        if(account_name){
            updatequery.account_name = account_name
        }
        
        if(account_type){
            updatequery.account_type = account_type
        }
        if(userId){
            updatequery.userId = userId
        }
        const accountdata = await accountModel.findOneAndUpdate({ _id: accountId },{$set:updatequery},{new:true});

        return res.status(200).send({ status: true, message: "Account details updated", data: accountdata });
    }
    catch(err){
        return res.status(500).send({ status: false, message: err.message })
    }
  }

  /* ---------------------- DELETE Account --------------------- */

  const deleteAccount = async function (req, res) {
    try {
      let accountId = req.params.accountId
      if (!isValidObjectId(accountId)) { return res.status(400).send({ status: false, message: 'accountId is  not  valid ' }) }
      
      let accountData = await accountModel.findOne({_id:accountId,isDeleted:false})
      if (!accountData) { return res.status(404).send({ status: false, message: "account not Found" }) }
      
    //   await accountModel.deleteOne({_id:accountId})
      await accountModel.findOneAndUpdate({ _id: accountId }, { $set: { isDeleted: true, deletedAt: new Date() } })
      return res.status(200).send({ status: true, message: "Account is sucessfully deleted" })
    }
    catch (err) {
      return res.status(500).send({ status: false, msg: err.message });
    }
  }


  module.exports = {createAccount,getAccount,updateAccount,deleteAccount}