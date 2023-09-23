const mongoose=require('mongoose')
const blogModel=require("../models/blogsModel")
const userModel = require("../models/userModel")

//get all blogs
exports.getAllBlogController=async(req,res)=>{
try {
    const blogs=await blogModel.find({}).populate('user');
    if(!blogs){
        return res.status(200).send({
            success:false,
            message:"No blogs Found"
        })
    }
    return res.status(200).send({
        success:true,
        message:"All Blogs list",
        blogsCount :blogs.length,
        blogs
    })
} catch (error) {
    console.log(error)
    return res.status(500).send({
        success:false,
        message:"Error in the get all blogs controller",
        error
    })
}
}
//create blog
exports.createBlogController=async(req,res)=>{
try {
    const {title,description,image,user}=req.body;
    //valodation
    if(!title || !description || !image || !user){
        return res.status(400).send({
            success:false,
            message:"Provide all feilds"
        })
    }
    const existingUser=await userModel.findById(user)
    if(!existingUser){
        return res.status(404).send({
            success:false,
            message:"unable to find user"
        })
    }
    const newBlog=new blogModel({title,description,image,user })
  //session
 const session =await mongoose.startSession()
 //start transaction
 session.startTransaction()

await newBlog.save({session})
//if existing user then push the blog in the same array
existingUser.blogs.push(newBlog)

//save it 
await existingUser.save({session})
//commit the transaction
await session.commitTransaction()



    await newBlog.save()
    return res.status(201).send({
        success:true,
        message:"Blog created",
        newBlog
    })
} catch (error) {
    console.log(error)
    return res.status(501).send({
        success:false,
        message:"Error in the create blog callback",
        error
    })
}
}

//update blog
exports.updateBlogController=async(req,res)=>{
try {
    const {id}=req.params
    const blog = await blogModel.findByIdAndUpdate(
        id,
        {...req.body},
        {new:true}
    )
    return res.status(200).send({
        success:true,
        message:"Blog Updated!",
        blog
    })

} catch (error) {
    console.log(error)
    return res.status(500).send({
        success:false,
        message:"Error in the update Blog controller",
        error
    })
} }


//get single blog details
exports.getBlogIdController=async(req,res)=>{
try {
    const {id}=req.params
    const blog =await blogModel.findById(id)
if(!blog){
    return res.status(200).send({
        success:false,
        message:"Blog not found"
    })
}
return res.status(200).send({
    success:true,
    message:"Fetching single blog",
    blog
})
} catch (error) {
    console.log(error)
    return res.status(501).send({
        success:false,
        message:"Error in the single blog controller",
        error
    })
}
}

//Delete blog
exports.deleteBlogController=async(req,res)=>{
try {
    
    const blog=await blogModel.findByIdAndDelete(req.params.id).populate("user")
    await blog.user.blogs.pull(blog)
    await blog.user.save()
    return res.status(200).send({
        success:true,
        message:"Blog Deleted!"
    })
} catch (error) {
    console.log(error)
    return res.status(501).send({
        success:false,
        message:"Error in the delete blog callback",
        error
    })
}
}

//Get user all blog 
exports.userBlogController=async(req,res)=>{
    try {
        const userBlog=await userModel.findById(req.params.id).populate("blogs")
        if(!userBlog){
            return res.status(404).send({
                success:false,
                message:"Blog not founds with this id"
            })
        }
        return res.status(200).send({
            success:true,
            message:"All user blogs",
            userBlog
        })
    } catch (error) {
        console.log(error)
        return res.status(501).send({
            success:false,
            message:"Error in the get user blog callback",
            error
        })
    }
}