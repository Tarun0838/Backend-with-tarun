import {v2 as cloudinary} from 'cloudinary'
import { response } from 'express';
import fs from 'fs';


cloudinary.config({
   cloud_name : process.env.CLOUD_NAME,
   api_key : process.env.CLOUD_API_KEY,
   api_secret: process.env.CLOUD_API_SECTERT,
})

const uploadCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type="auto",
        })
        console.log("file is upload to Cloudinary Successfully");
        console.log(response.url);
        return response;
        
    } catch (error) {
        /* unlinkSync kya kreaga ye locally stored file ko remove karega 
         */
        fs.unlinkSync(localFilePath);
        return null;
    }
}


/**
 * cloudinary hm use karte hai apni files , images , video ko ek cloud par store karne ke liye 
 * where as multer ka use karte hai multipart ya form se kisi images ya file ko local server par store krne ke liye
 * 
 * localServer par ek bar file store ho gayi fir hm us file ko cloud ke server par upload kr dete hai cloudinary ke through
 * 
 * ye 2 step process hota hai 
 * 
 * now ab multer ki cofiguration karenge as a middlewares
 * 
 */