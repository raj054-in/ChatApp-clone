const {Server}=require("socket.io")
const http=require("http")
const app=require("../app")

const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        credentials:true
       
    }
})  


function getReciversScoketId(userId){
    return userSocketMap[userId]
}


const userSocketMap={}
io.on("connection",(socket)=>{
    console.log("a user connected",socket.id)
    const userId=socket.handshake.query.userId
    if(userId) userSocketMap[userId]=socket.id

    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id)
    })})
    
    io.emit("getOnlineUsers",Object.keys(userSocketMap))



module.exports={io,server,getReciversScoketId}