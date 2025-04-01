import "dotenv/config";
import cloudinary from "cloudinary";
export const cloudinaryStore = async (url) => {
    await cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
let result
try{
     result = await cloudinary.uploader.upload(url);
    console.log(result)
}catch(error){
    return error
}
    return result.secure_url;



}

