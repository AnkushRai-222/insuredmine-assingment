const { isValidObjectId } = require("mongoose");
const userModel  =  require("../models/userModel")


/* --------------------------------- CREATE USER -------------------------- */

const createUser = async function(req,res){
    try{

        let data = req.body;
        if(Object.keys(data).length == 0){
            return res.status(400).send({status:false,message:"Please Provide Data"})
        }
        let { firstName,email,phone,userType,dob,address,city,zip} = data;

        if(!firstName){return res.status(400).send({status:false,message:"FirstName is Required"})}
        if(!email){return res.status(400).send({status:false,message:"email is Required"})}
        if(!phone){return res.status(400).send({status:false,message:"phone is Required"})}
        if(!userType){return res.status(400).send({status:false,message:"userType is Required"})}
        if(!dob){return res.status(400).send({status:false,message:"dob is Required"})}
        if(!address){return res.status(400).send({status:false,message:"address is Required"})}
        if(!city){return res.status(400).send({status:false,message:"city is Required"})}
        if(!zip){return res.status(400).send({status:false,message:"zip is Required"})}

        // Checking Uniqueness for email and phone

       const findEmail = await userModel.findOne({email:email})
       if(findEmail){
        return res.status(400).send({status:false,message:"Email Already Registered"})
       }

       const findPhone = await userModel.findOne({phone:phone})
       if(findPhone){
        return res.status(400).send({status:false,message:"Phone  Already Registered"})
       }
        
       const saveData = await userModel.create(data)
       return res.status(201).send({status:true,message:"User Created Successfully",data:saveData})
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

// -------------------------------- GET USER -----------------------------------
const getUser = async function (req, res) {
    try {
      const userId = req.params.userId;
  
      if (!isValidObjectId(userId)) { return res.status(400).send({ status: false, message: "Please provide a valid user id" }); }
  
      let userData = await userModel.findOne({ _id: userId ,isDeleted:false})
  
      if (!userData) { return res.status(404).send({ status: false, message: "User not found" }); }
  
      return res.status(200).send({ status: true, message: "User profile details", data: userData });
  
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message })
    }
  }

  // ----------------------------- Update User ---------------------------------------
   const updateUser = async function (req, res) {
    try {
      const userId = req.params.userId;
      if (!isValidObjectId(userId)) { return res.status(400).send({ status: false, message: "Please provide a valid user id" }); }
      const data = req.body
      let { firstName,email,phone,userType,dob,address,city,zip} = data;
     
      let updateQuery ={}
      if(firstName){
          updateQuery.firstName = firstName
      }
      if(email){
        const findEmail = await userModel.findOne({email:email})
        if(findEmail){
         return res.status(400).send({status:false,message:"Email Already Registered"})
        }
        updateQuery.email = email
      }

     if(phone){
        const findPhone = await userModel.findOne({phone:phone})
        if(findPhone){
         return res.status(400).send({status:false,message:"Phone  Already Registered"})
        }
        updateQuery.phone = phone
     }
     if(userType){
        updateQuery.userType = userType
     }
     if(dob){
        updateQuery.dob = dob
     }
     if(address){
        updateQuery.address = address
     }
     if(city){
        updateQuery.city = city
     }
     if(zip){
        updateQuery.zip = zip
     }

     const userdata = await userModel.findOneAndUpdate({ _id: userId },{$set:updateQuery},{new:true});

     return res.status(200).send({ status: true, message: "User profile updated", data: userdata });

    } catch (error) {
      return res.status(500).send({ status: false, message: error.message })
    }
  }
   
  /* ------------------------------ DELETE USER --------------------- */
  const deleteUser = async function (req, res) {
    try {
      let userId = req.params.userId
      if (!isValidObjectId(userId)) { return res.status(400).send({ status: false, message: 'userId is a not a valid ' }) }
      
      let userData = await userModel.findOne({_id:userId,isDeleted:false})
      if (!userData) { return res.status(404).send({ status: false, message: "user not Found" }) }
      
    //   await userModel.deleteOne({_id:userId})
      await userModel.findOneAndUpdate({ _id: userId }, { $set: { isDeleted: true, deletedAt: new Date() } })
      return res.status(200).send({ status: true, message: "User is sucessfully deleted" })
    }
    catch (err) {
      return res.status(500).send({ status: false, msg: err.message });
    }
  }
  module.exports = {createUser,getUser,updateUser,deleteUser}