const userModel=require("../models/user.model")
const bcrypt=require('bcrypt')
const genToken=require('../services/tokenGen')
const blacklistTokenModel=require("../models/blacklistToken")
const uploadPp=require('../services/uploadPp')

async function  signup(req,res) {
    const {email,fullName,password}=req.body
    if (!email||!fullName||!password) {
        return res.status(400).json({
            message:"All the fields are required"
        })    
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if ( !emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }

    if (password.length<6) {
        return res.status(400).json({
            message:"Password should be minimum of length 6"
        })       
    }
    const userAlreadyExists=await userModel.findOne({email:email})
    if (userAlreadyExists) {
        return res.status(400).json({
            message:"User with the following email already Exists"
        })   
    }
    
    try {
        const hashPassword=await bcrypt.hash(password,10)
        const user= new userModel({
            email:email,
            fullName:fullName,
            password:hashPassword
        })
        if (user) {
            const token = await genToken(user._id, res)
            await user.save()

            return res.status(201).json({
                token,
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profilePic: user.profilePic
            })
        } else {
            console.log("user instance is not created")
            return res.status(400).json({
                message:"Invalid user not found "
            })
            
        }
        
    } catch (error) {
        res.status(500).json({
            message:"Internal Serval Error"
        })
        
    }
}
async function  login(req,res) {
    const {email,password}=req.body
    if (!email||!password) {
        return res.status(400).json({
            message:"Invalid credentials"
        })    
    }
    try {
        const currentUser=await userModel.findOne({
            email:email
        })
        if (!currentUser) {
            return res.status(400).json({
                message:"Invalid credentials"
            })
        }
        const isPasswordValid=await bcrypt.compare(password,currentUser.password)  
        if (!isPasswordValid) {
            return res.status(400).json({
                message:"Incorrect password"
            })   
        }
        const token = await genToken(currentUser._id, res)
        res.status(200).json({
            message: 'User logged in sucessfully',
            user: {
                _id: currentUser._id,
                email: currentUser.email,
                fullName: currentUser.fullName
            },
            token
        })
    } catch (error) {
             console.log(error)
             res.status(500).json({
             message:error.message,
                         
        })       
    }
   
}
//black listing token 
async function logout(req,res) {
    const token =req.cookies.jwt
    if (!token) {
        return res.status(200).json({
            message:"you are already logged out"
        })
    }
    await blacklistTokenModel.create({
        token:token
    })
    res.clearCookie("jwt")
    res.status(200).json({
        message:"the user is logged out sucessfully "
    })
    
}
async function updateProfile(req ,res) {
    console.log(req)
    if (!req.file) {
        return res.status(400).json({
            message:"No file uploaded"
        })    
    }
    try {
        const profilePic = await uploadPp(req.file)
        const user = await userModel.findByIdAndUpdate(req.user._id, { profilePic }, { new: true })
        res.status(200).json({
            message: "Profile picture updated successfully",
            user
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
        
    }

}
async function getProfile(req,res) {
    try {
        res.status(200).json({
            message:"User profile fetched successfully",
            user:req.user
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
    
}
module.exports={signup,login,logout,updateProfile,getProfile}