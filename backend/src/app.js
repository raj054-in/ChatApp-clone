

const express= require("express")
const cookieParser = require('cookie-parser')
const app =express()
const cors=require("cors")


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


const authRoute=require('./routes/auth.routes')
const messageRoute=require("./routes/message.routes")

app.use("/api/auth",authRoute)
app.use("/api/message",messageRoute)

app.use("/",(req,res)=>{
    res.status(200).json({        
        message:"welcome to My app"
    })
})



module.exports=app