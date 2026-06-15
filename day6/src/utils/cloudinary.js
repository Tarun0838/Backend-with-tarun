import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEYS,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadCoudinary = async function(localFilePath){
    try {
        if(!localFilePath) return null
        // upload file to coudinary
        const response = await cloudinary.uploader.upload(localFilePath)
        console.log("File is uploaded sucessfully");
        console.log("url: ", response.url);
        // remove localstored file 
        fs.unlinkSync(localFilePath);
        return response;
        // console.log(response);
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
}

export {uploadCoudinary};