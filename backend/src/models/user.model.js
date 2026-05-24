const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true,
        
    },
    fullName:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
        minlength:6
    },
    profilePic:{
        type:String,
        default:""
    }
},{
    timestamps:true
})
const userModel=mongoose.model('User',userSchema)
module.exports=userModel