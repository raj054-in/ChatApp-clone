const app =require('./src/app')
const connectDB=require('./src/config/db')
const {PORT}=require("./secret")


connectDB()
app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`)
})