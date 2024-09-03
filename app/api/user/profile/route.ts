import dbConnect from "@/Db/Db";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export async function PUT(req:Request){
    await dbConnect()
    try{
        // getting the data
        const data = await req.json();
        // getting the search params
        const {searchParams } = new URL(req.url);
        const queryParam = {
            userEmail : searchParams.get('userEmail')
        }
        // only updating the user data other than password
        const user = await UserModel.findOne({email:queryParam.userEmail})
        if(!user){
            return NextResponse.json({message:'User not found', success:false}, {status:404})
        }
        const updatedUser = UserModel.findByIdAndUpdate(user._id, data.addressData, {new:true})
        if(!updatedUser){
            return NextResponse.json({message:'Unable to update the fields', success:false}, {status:400})
        }
        return NextResponse.json({message:'Updated the user fields', success:true, user:updatedUser}, {status:200})
    }catch(err){
        return NextResponse.json({message:'Internal Server Error', success:false}, {status:500})
    }
}