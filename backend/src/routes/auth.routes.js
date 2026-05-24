
const authControllers=require('../controllers/auth.controller')
const routes=require("express").Router()
const authMiddleware=require("../middleware/auth.middleware")
const multer=require('multer')
const upload=multer({
    storage:multer.memoryStorage()
})

routes.post("/signup",authControllers.signup)
routes.post("/login",authControllers.login)
routes.post("/logout",authControllers.logout)
routes.get("/profile",authMiddleware,authControllers.getProfile)
routes.put("/update-profile",authMiddleware,upload.single('profilePic'),authControllers.updateProfile)

module.exports=routes