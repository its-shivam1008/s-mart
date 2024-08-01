import UserModel from "@/models/User";
import dbConnect from "@/Db/Db";
import { NextResponse } from "next/server";

export async function GET(req:Request){
    await dbConnect();
    try{
        const {searchParams} = new URL(req.url);
        const queryParam = {
            username:searchParams.get('username')
        }
        const user = UserModel.findOne({username:queryParam.username});
        if(!user){
            return NextResponse.json({message:"Username is available", success:true}, {status:200});
        }
        return NextResponse.json({message:"Username is taken", success:false}, {status:200})
    }catch(err){
        return NextResponse.json({message:"Internal server Error", success:false}, {status:500})
    }
}