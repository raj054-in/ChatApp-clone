const {MONGOOSE_URL}=require('../../secret')
const mongoose =require('mongoose')

async function connectDB() {
    try {
        await mongoose.connect(MONGOOSE_URL)
        console.log("connected to DB")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
    
} 

module.exports=connectDB