const express=require("express")
const { getAllBlogController, createBlogController, updateBlogController, getBlogIdController, deleteBlogController, userBlogController } = require("../controller/blogController")

//router object
const router=express.Router()

//routes
//Get || all blogs
router.get('/all-blog',getAllBlogController)

//POST||create blog
router.post('/create-blog',createBlogController)
//PUT || update blog
router.put("/update-blog/:id",updateBlogController)
//get || single blog details
router.get('/get-blog/:id',getBlogIdController)

//Delete || delete blog
router.delete('/delete-blog/:id', deleteBlogController)

//get || get user blog 
router.get('/user-blog/:id',userBlogController)

module.exports=router