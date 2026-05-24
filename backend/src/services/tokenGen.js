const {JWT_SECRET_KEY}=require("../../secret")
const jwt=require("jsonwebtoken")
async function genToken(userId,res) {
    const token =await jwt.sign({id:userId},JWT_SECRET_KEY,{expiresIn:'7d'})
    res.cookie("jwt",token, {
        maxAge:7*24*60*60*1000,
        httpOnly: true,
        sameSite: 'strict',

        })
    



    return token
}
module.exports=genToken