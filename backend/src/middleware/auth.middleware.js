const {JWT_SECRET_KEY}=require("../../secret")
const jwt= require("jsonwebtoken")
const balcklistTokenModel=require("../models/blacklistToken")
const userModel=require("../models/user.model")


async function authMiddleware(req,res,next) {
    const token =req.cookies.jwt
    const isTokenBlacklisted=await balcklistTokenModel.findOne({token})
    if(isTokenBlacklisted){
        return res.status(401).json({message:"Unauthorized"})
    }
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    try {
        const decoded= await jwt.verify(token,JWT_SECRET_KEY)
        req.user=await userModel.findById(decoded.id).select("-password")
        
        next()
    } catch (error) {
        return res.status(401).json({message:"Unauthorized"})    
    }
   
}
module.exports=authMiddleware