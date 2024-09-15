'use server';
import dbConnect from "@/Db/Db";
import StoreModel from "@/models/Store";
import UserModel from "@/models/User";

export const checkUserType  = async (userEmail:string) =>{
    await dbConnect()
    try{
        const user = await UserModel.findOne({email :userEmail})
        if(!user){
            return {message:'Cannot find user', success:false};
        }
        return {message:'user found', success:true, userRole:user.role}
    }catch(err){
        return {message:'some error occured', error: JSON.stringify(err)}
    }
}

export const checkUserTypeWithStoreFormFilled = async (userEmail:string) =>{
    await dbConnect()
    try{
        const user = await UserModel.findOne({email :userEmail})
        if(!user){
            return {message:'Cannot find user', success:false};
        }
        if(user.role == 'User'){
            return {message:'The person is normal user',  userRole:user.role, success:true}
        }
        if(user.role == 'StoreOwner'){
            const store = await StoreModel.findOne({'associatedUser.userEmail':userEmail})
            if(store?.owner_name && store?.businessAddress?.address && store?.razorpay?.id){
                return {message:'All necessary fields are filled',  userRole:user.role, success:true}
            }
            return {message:'store form fields not found',  userRole:user.role, success:false}
        }
    }catch(err){
        return {message:'some error occured', error: JSON.stringify(err)}
    }
}
export const checkUserAddressFormFilled = async (userEmail:string) =>{
    await dbConnect()
    try{
        const user = await UserModel.findOne({email :userEmail})
        if(!user){
            return {message:'Cannot find user', success:false};
        }
        if(!user.address.address || !user.address.city || !user.address.pincode || !user.address.state || !user.address.street){
            const addressString = JSON.stringify(user.address)
            return {message:'Some address field(s) are not filled', success:false, address:addressString}
        }else{
            const addressString = JSON.stringify(user.address)
            return {message:'Address is present', success:true, address:addressString}
        }
    }catch(err){
        return {message:'some error occured', error: JSON.stringify(err)}
    }
}


export const checkUserPassword = async (userEmail:string, password:string) => {
    await dbConnect();
    try{
        const user = await UserModel.findOne({email :userEmail})
        if(!user){
            return {message:'Cannot find user', success:false};
        }
        const isPasswordCorrect = await user.comparePassword(password);
        if(isPasswordCorrect){
            return {message:'Correct password', success:true}
          }else{
            return {message:'Incorrect password', success:false}
          }
    }catch(err){
        return {message:'some error occured', error: JSON.stringify(err)}
    }
}


export const updateUserPassword = async (userEmail:string, password:string) => {
    await dbConnect();
    try{
        const user = await UserModel.findOne({email :userEmail})
        if(!user){
            return {message:'Cannot find user', success:false};
        }
        user.password = password
        const res = await user.save();
        if(res){
            // console.log(res);
            return {message:'Password updated', success:true}
          }else{
            return {message:'Unable to update password', success:false}
          }
    }catch(err){
        return {message:'some error occured', error: JSON.stringify(err)}
    }
}