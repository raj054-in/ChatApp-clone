const app =require('./src/app')
const connectDB=require('./src/config/db')
const {PORT}=require("./secret")
const {io,server}=require("./src/services/socket")


connectDB()
server.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`)
})