const {Server}=require("socket.io")
let io


function getReciversScoketId(userId){
    return userSocketMap[userId]
}

function getIO() {
    return io
}

function initSocket(server) {
    io = new Server(server,{
        cors:{
            origin:"http://localhost:5173",
            credentials:true
       
        }
    })

    io.on("connection",(socket)=>{
        console.log("a user connected",socket.id)
        const userId=socket.handshake.query.userId
        if(userId) {
            userSocketMap[userId]=socket.id
            io.emit("getOnlineUsers",Object.keys(userSocketMap))
        }

        socket.on("disconnect",()=>{
            console.log("user disconnected",socket.id)
            if(userId){
                delete userSocketMap[userId]
                io.emit("getOnlineUsers",Object.keys(userSocketMap))
            }
        })
    })

    return io
}


const userSocketMap={}
module.exports={initSocket,getIO,getReciversScoketId}