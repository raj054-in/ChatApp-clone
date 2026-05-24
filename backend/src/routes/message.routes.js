const express= require("express")
const routes=express.Router()
const authMiddleware=require("../middleware/auth.middleware")
const {getAllUsers,getAllMessages,sendMessage}=require('../controllers/message.controller')
const multer=require('multer')
const upload=multer({
    storage:multer.memoryStorage()
})
routes.get("/get-all-users",authMiddleware,getAllUsers)
routes.get('/get-all-messages/:id',authMiddleware,getAllMessages)
routes.post('/send-message/:id',authMiddleware,upload.single('image'),sendMessage)










module.exports=routes