const mongoose=require('mongoose')

const messageSchema= new mongoose.Schema({
   senderId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
         ref:'User'
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'User'
    },
    text:{
        type:String,
    },
    image:{
        type:String
    }
},{
    timestamps:true
})

const messageModel=mongoose.model("Message",messageSchema)

module.exports=messageModel
