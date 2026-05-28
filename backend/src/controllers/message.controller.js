const userModel=require("../models/user.model")
const messageModel=require("../models/message.model")
const uploadPp=require('../services/uploadPp')
const { getIO, getReciversScoketId } = require("../services/socket")

async function getAllUsers(req,res) {
    try {
        const users=await userModel.find({_id:{$ne:req.user._id}}).select("-password")
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
    
}
async function  getAllMessages(req,res) {
    const participantId=req.params.id
    const currentUserId=req.user._id
    try {
        const messages=await messageModel.find({
            $or:[{senderId:participantId,receiverId:currentUserId},
                {senderId:currentUserId,receiverId:participantId}
            ]
        })
        res.status(200).json(messages)
        
    } catch (error) {
         res.status(400).json({
            message:error.message
        })
        
    }


    
}
async function  sendMessage(req,res) {
     const participantId=req.params.id
     const currentUserId=req.user._id
     const {text}=req.body
     const image=req.file
     if (!image&&!text) {
        return res.status(400).json({
            message:"Message must contain text or image"
        })    
     }
     let imageUrl=null
     try {
        if (image) {
            imageUrl=await uploadPp(image)      
        }
        const newMessage=new messageModel({
            senderId:currentUserId,
            receiverId:participantId,
            text:text||null,
            image:imageUrl||null
        })
        
        await newMessage.save()
        const senderSocketId=getReciversScoketId(currentUserId)
        const receiverSocketId=getReciversScoketId(participantId)
        const io=getIO()
        if(io&&receiverSocketId){
            io.to(receiverSocketId).emit('message',newMessage)
        }
        if(io&&senderSocketId&&senderSocketId!==receiverSocketId){
            io.to(senderSocketId).emit('message',newMessage)
        }
        res.status(200).json({
            message:"message sent",
            newMessage
        })
     } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
     }
    
    
}
module.exports={getAllUsers,getAllMessages,sendMessage}