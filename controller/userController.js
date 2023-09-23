const userModel=require('../models/userModel')
const bcrypt=require('bcrypt')
//create user (register) 
exports.registerController=async(req,res)=>{
    try {
        const {userName,email,password,blogs}=req.body
        //validation
        if(!userName || !email || !password ){
            return res.status(400).send({
                success:false,
                message:"Please Provide all fields"
            })
        }
//check for existing user
 const existingUser=await userModel.findOne({email})
   if(existingUser){
    return res.status(500).send({
        success:false,
        message:"User already existing "
    })
}
const hashedPassword=await bcrypt.hash(password,10)

//save new  user
const user =new userModel({userName,email,password:hashedPassword , blogs})
await user.save()
return res.status(201).send({
    success:true,
    message:"New user create",
    user
})
   
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in register callback ",
            error
        })
    }
}

//get all user 
exports.getAllUsers=async(req,res)=>{
try {
    const users =await userModel.find({})
    res.status(200).send({
        userCount:users.length,
        success:true,
        message:"All user data",
        users
    })
    
} catch (error) {
console.log(error)
return res.status(500).send({
    success:false,
    message:"Error in get all user",
    error
})
}
};



//login user 
exports.logingController=async(req,res)=>{
    try {
        const {email,password}=req.body;
        //validation
        if(!email || !password){
            return res.status(401).send({
                success:false,
                message:"Please Provide email or password"
            })
        }
        //check for existing user
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(200).send({
                success:false,
                message:"Email is not register"
            })
        }
     //password
     const isMatch=await bcrypt.compare(password , user.password)
     if(!isMatch){
        return res.status(401).send({
            success:false,
            message:"Provide email or password"
        })
     }
     return res.status(200).send({
      success:true,
      message:"Login successfully",
    user:{
        name:user.userName,
        email:user.email,
        id:user._id
    }
     })
    } catch (error) {
        console.log(error)
        return res.status(501).send({
            success:false,
            message:"Error in the login callback",
            error
        })
    }
}