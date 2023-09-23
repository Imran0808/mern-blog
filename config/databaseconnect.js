  const mongoose=require("mongoose")


  const connectDB= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connect Database')
    } catch (error) {
        console.log(`Error in mogodb ${error}`)
    }
  }
  module.exports =connectDB;