import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEYS,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadCloudinary = async (localFilePath)=> {
    try {
        if(!localFilePath) return null;
        // ab file ko upload kardo cloudinarypar 
       const response = await cloudinary.uploader.upload(localFilePath , {resource_type: "auto"} );
        
       console.log("file upload done ", response.url);
       console.log("response : ", response);
       return response;

    } catch (error) {
        fs.unlinkSync(localFilePath)
        // agar try mai jo file upload karne ki kosis kar rahe hai agar vo fail ho jaati hai to us file ko remove kar dunga
        
        return null;
    }
}