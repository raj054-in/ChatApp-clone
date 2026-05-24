const mongoose=require("mongoose")

const blacklistToken=new mongoose.Schema({
    token:{
        require:true,
        type:String,
    },
    createdAt:{
        type:Date,
        expires:3*24*60*60*1000,
        default:Date.now
    }
})

const blacklistTokenModel=mongoose.model("Blacklistedtoken",blacklistToken)
module.exports=blacklistTokenModel