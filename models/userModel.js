const mongoose=require('mongoose')  

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        require:[true,'username is required']

    },
    email:{
       type:String,
       require:[true,'email is required']
    },
    password:{
        type:String,
        require:[true,'Password is required']
    },
    blogs:[{    
        type:mongoose.Types.ObjectId,
        ref:'blogs',
    }]
},{timestamps:true})
const userModel=mongoose.model('User',userSchema);
module.exports=userModel;