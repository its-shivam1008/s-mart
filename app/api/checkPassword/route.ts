import UserModel from "@/models/User";
import dbConnect from "@/Db/Db";
import { NextResponse } from "next/server";
import { AxiosResponse } from "axios";

export async function GET(req:Request){
    await dbConnect();
    try{
        const {searchParams} = new URL(req.url);
        const queryParam = {
            email:searchParams.get('email')
        }
        const user = await UserModel.findOne({email:queryParam.email});
        if(!user){
            return NextResponse.json({message:"User not found", success:false}, {status:404})
        }
        if(!user.password){
            return NextResponse.json({message:"Password field not present, redirect to setup-password", isPasswordPresent:false}, {status:200})
        }
        return NextResponse.json({message:"Password field not present, redirect to setup-password", isPasswordPresent:true}, {status:200})
    }catch(err){
        return NextResponse.json({message:"Internal server error", success:false}, {status:500})
    }
}