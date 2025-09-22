const express = require("express")
const cors = require("cors")
const path = require("path")
require('dotenv').config()
const routes = require(path.join(__dirname,"routes.js"))
const connect = require(path.join(__dirname,"DB","connectDB.js"))
const app=express()
const cookieParser = require("cookie-parser")


app.use(express.json())
app.use(cors({
    origin : "*",
    credentials : true
}))

app.use(cookieParser())
app.use(express.static(path.join(__dirname,"Frontend")))
app.use('/',routes)



const appStart = async ()=>{
    try{
        await connect(process.env.MONGODB_URL)
        app.listen(process.env.PORT)
        console.log(`Server is listening on port ${process.env.PORT}`)
    }
    catch(err){
        console.log(err)
    }
}

appStart()