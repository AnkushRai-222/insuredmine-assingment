const express = require("express")
const router = express.Router()
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const csvFileController = require("../controllers/csvFileUpload")
const {createUser,getUser,updateUser,deleteUser} = require('../controllers/userController')
let {createAccount,getAccount,updateAccount,deleteAccount} = require('../controllers/accountController')
let {createPolicy,getPolicy,updatePolicy,deletePolicy} = require("../controllers/policyController")

/* ------------------------- Upload Csv to Db -------------- */

router.post('/upload', upload.single('file'),csvFileController.uploadCsvToMongodb)

 /* ----------------------- User Routes-------------------- */
router.post('/register',createUser);
router.get('/user/:userId',getUser);
router.put('/user/:userId',updateUser);
router.delete('/user/:userId',deleteUser);

/* ----------------------- Accounts Routes -------------------*/
router.post('/accounts',createAccount);
router.get('/account/:accountId',getAccount);
router.put('/account/:accountId',updateAccount);
router.delete('/account/:accountId',deleteAccount);


/* ------------------------ Policy Routes --------------------- */
router.post('/policy',createPolicy);
router.get('/policy/:policyId',getPolicy);
router.put('/policy/:policyId',updatePolicy);
router.delete('/policy/:policyId',deletePolicy);


router.all("/*",function(req,res){
    res.send({status:false,message:"Invalid Https Request"})
})
module.exports = router