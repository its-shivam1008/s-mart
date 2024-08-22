import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";


cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

const uploadOnCloudinary = async (localFilePath:any) =>{
    try{
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type : 'auto'
        })
        // file has been uploaded successfully
        console.log("file is uploaded on cloudinary", response.url);
        return response;
    }catch(err){
        fs.unlinkSync(localFilePath) // removes the locally saved temporary files as the upload operation got failed
        return null;
    }
}

export {uploadOnCloudinary}