const express=require("express") 
const { getAllUsers, registerController, logingController } = require("../controller/userController")

//router object 
const router =express.Router()

//GET ALL USER || GET
router.get('/all-users',getAllUsers)

//CREATE USER || POST
router.post('/register',registerController)
  

//LOGIN || POST 
router.post('/login',logingController)
module.exports=router