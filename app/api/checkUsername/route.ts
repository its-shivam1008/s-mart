import UserModel from "@/models/User";
import dbConnect from "@/Db/Db";
import { NextResponse } from "next/server";
import { usernameValidation } from "@/schemas/signUpSchema";

export async function GET(req:Request){
    await dbConnect();
    try{
        // extracting the username from the query
        const {searchParams} = new URL(req.url);
        const queryParam = {
            username:searchParams.get('username')
        }
        // validating the username first then we will check the username exits or not
        const result = usernameValidation.safeParse(queryParam.username)
        if(!result.success){
            // const usernameErrors = result.error.format().username?._errors || []
            return NextResponse.json({message:result.error.issues[0].message, success:false}, {status:400});
        }

        // checking the username exists or not 
        const user = await UserModel.findOne({username:queryParam.username});
        if(!user){
            // if not, the username is available to acquire
            return NextResponse.json({message:"Username is available", success:true}, {status:200});
        }else{
            // if username exists then the user cannot take it
            // console.log('this block is executing')
            return NextResponse.json({message:"Username is taken", success:false}, {status:200})
        }
    }catch(err){
        return NextResponse.json({message:"Internal server Error", success:false}, {status:500})
    }
}