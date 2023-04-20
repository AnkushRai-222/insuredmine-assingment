
const csvtojson = require('csvtojson');

const Agent = require("../models/agentModel")
const User = require("../models/userModel")
const UserAccount = require("../models/accountModel")
const Policy = require("../models/policyModel")
const LOB = require("../models/lobModel")
const Carreir = require("../models/carreirModel");

const uploadCsvToMongodb = (req, res) => {
    csvtojson()
      .fromFile(req.file.path)
      .then(json => {
        json.forEach(data => {
          
          const user = new User({
            firstName: data.firstname,
            email: data.email,
            phone: data.phone,
            userType:data.userType,
            dob:data.dob,
            address:data.address,
            city:data.city,
            zip:data.zip
          });
          user.save();
          
          const agent = new Agent({
            agentName: data.agent, 
            userId:user._id
          });
          agent.save();

          const user_account = new UserAccount({
            account_name:data.account_name,
            account_type:data.account_type,
            userId:user._id
          })
          user_account.save()

          const policy = new Policy({
            policy_mode:data.policy_mode,
            policy_number:data.policy_number,
            policy_type:data.policy_type,
            policy_start_date:data.policy_start_date,
            policy_end_date:data.policy_end_date,
            userId:user._id
          })

          policy.save()

          const lob = new LOB({
            category_name:data.category_name,
            userId:user._id
          })
          lob.save()

          const carreir = new Carreir({
            company_name:data.company_name,
            userId:user._id
          })
          carreir.save()
        });
       return  res.status(200).send({status:true,message:'Data uploaded successfully'});
      });
  };
  

  module.exports = {uploadCsvToMongodb}