'use server';
import dbConnect from "@/Db/Db";
import UserModel from "@/models/User";

export const checkUserType  = async (userEmail : string) =>{
    await dbConnect()
    try{
        const user = await UserModel.findOne({email :userEmail})
        if(!user){
            return {message:'Cannot find user', success:false};
        }
        return {message:'user found', success:true, userRole:user.role}
    }catch(err){
        return {message:'some error occured', error:err}
    }
}