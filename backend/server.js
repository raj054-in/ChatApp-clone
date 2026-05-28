
const connectDB=require('./src/config/db')
const {PORT}=require("./secret")
const http=require("http")
const app=require('./src/app')
const {initSocket}=require("./src/services/socket")


const server=http.createServer(app)
initSocket(server)


connectDB()
server.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`)
})