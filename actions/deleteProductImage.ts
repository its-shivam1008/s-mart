'use server'
import dbConnect from '@/Db/Db';
import ProductModel from '@/models/Product';
import axios from 'axios';

export const deleteImageFromCloudinary = async (imageUrl:any) => {
  try {
    // Extracting the public ID from the image URL
    const publicId = imageUrl.split('/').pop().split('.')[0];
    const data =  {
      public_id: publicId,
      api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, // Cloudinary API key
      timestamp: Math.floor(Date.now() / 1000),
      signature: generateSignature(publicId, process.env.CLOUDINARY_API_SECRET) // Generating the signature
    }
    
    // Making a DELETE request to Cloudinary
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`, 
      data
    );

    console.log('Delete response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw error;
  }
};

// Function to generate the signature needed for the delete request
const generateSignature = (publicId:any, apiSecret:any) => {
  const crypto = require('crypto');
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = crypto.createHash('sha1')
    .update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
    .digest('hex');
  return signature;
};

export const deleteProductImageFromUiAndDB = async(productId:any, imageURL:any) =>{
  await dbConnect();
  try{
    const product = await ProductModel.findByIdAndUpdate(productId, {$pull:{images: imageURL}}, {new: true});
    if(product){
      const stringifyProduct = JSON.stringify(product)
      return {message:'Image url deleted', stringifyProduct, success:true}
    }else{
      return {message:'Product not found', success:false}
    }
  }catch(err){
    return {message: 'some error occured', success:false, error:err}
  }
}
