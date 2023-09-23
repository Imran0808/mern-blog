const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv')
const connectDB = require('./config/databaseconnect')

//env config
dotenv.config()

//import user routes
const userRoutes=require('./routes/userRoutes')
//import blogs routes
const blogRoutes=require('./routes/blogRouter')
const { getAllBlogController } = require('./controller/blogController')

//mongodb connect
connectDB()

//rest object
const app=express()

//middlewares
app.use(cors())
app.use(express.json())   //json parser
app.use(morgan('dev'))

 
//routes
app.use('/api/v1/user',userRoutes)

app.use('/api/v1/blog',blogRoutes)
const PORT = process.env.PORT||8080
//listen
app.listen(PORT,()=>{
    console.log(`Server running on ${process.env.DEV_MODE} Port no ${PORT}`)
})