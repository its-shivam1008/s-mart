import dbConnect from "@/Db/Db";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req:Request){
    await dbConnect();
    try{
        const {searchParams} = new URL(req.url)
        const queryParam = {
            userEmail:searchParams.get('userEmail'),
        }
        const user = await UserModel.findOne({email:queryParam.userEmail})
        if(user){
            return NextResponse.json({message:'User role fetched', userRole:user.role, success:true}, {status:200})
        }else{
            return NextResponse.json({message:'User not found', success:false}, {status:404})
        }
    }catch(err){
        return NextResponse.json({message:'Internal Server Error', success:false}, {status:500})
    }
}