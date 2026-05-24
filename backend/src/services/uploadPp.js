const cloudinary=require('cloudinary').v2
const {CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET}=require('../../secret')

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

async function uploadPp(file) {
    const fileBase64 = file.buffer.toString('base64');
    const fileUrl = `data:${file.mimetype};base64,${fileBase64}`;
    const uploadResponse=await cloudinary.uploader.upload(fileUrl,{
        folder:'profile_pictures',
        
    })
    const secureUrl=uploadResponse.secure_url
    return secureUrl


}
module.exports=uploadPp