

const express= require("express")
const cookieParser = require('cookie-parser')
const app =express()
const cors=require("cors")
const path = require('path')


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

// __dirname is provided by CommonJS; no need to redeclare it

const authRoute=require('./routes/auth.routes')
const messageRoute=require("./routes/message.routes")

app.use("/api/auth",authRoute)
app.use("/api/message",messageRoute)

app.use("/",(req,res)=>{
    res.status(200).json({        
        message:"welcome to My app"
    })
})
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}



module.exports=app