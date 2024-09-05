'use server';

import dbConnect from "@/Db/Db";
import UserModel from "@/models/User";

export const addItemToWishList = async (userEmail:string, productId:any) => {
    await dbConnect()
    try{
        const user = await UserModel.findOne({email:userEmail})
        if(!user){
            return {message:'user not found', success:false}
        }
        if(!user.wishlist.includes(productId)){
            user.wishlist.push(productId)
            await user.save()
            return {message:'item added to wishlist', success:true}
        }
        return {message:'item is already present', success:false}
    }catch(err){
        return {message:'Some error occured', error:err, success:false}
    }
}

export const removeItemFromWishList = async (userEmail:string, productId:any) => {
    await dbConnect()
    try{
        const user = await UserModel.findOne({email:userEmail})
        if(!user){
            return {message:'user not found', success:false}
        }
        const index = user.wishlist.indexOf(productId);
        if(index > -1) {
            const updatedUser = await UserModel.findOneAndUpdate({email:userEmail}, {$pull:{wishlist:productId}})
            // await user.save()
            return {message:'item added to wishlist', success:true}
        }
        return {message:'Item is not present in the wishlist, that is to be removed', success:false}
    }catch(err){
        return {message:'Some error occured', error:err, success:false}
    }
}

export const getItemFromWishList = async (userEmail:string) => {
    await dbConnect()
    try{
        const user = await UserModel.findOne({email:userEmail})
        if(!user){
            return {message:'user not found', success:false}
        }
        if(!user.wishlist.length){
            return {message:'wishlist is empty', wishlist:[], success:false}
        }
        const wishlistJsonString = JSON.stringify(user.wishlist)
        return {message:'wishlist found', wishlist:wishlistJsonString, success:true}
    }catch(err){
        return {message:'Some error occured', error:err, success:false}
    }
}