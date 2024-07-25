import dbConnect from "@/Db/Db";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    await dbConnect();
    try{
        const data = await req.json();
        //finding the user is present in the db or not
        const userByEmail = await UserModel.findOne({email:data.session.user.email});
        if(!userByEmail){
            return NextResponse.json({message: "user not saved try to sign up again", success:false},{ status:404});
        }

        // now checking the code entered by the user is equal to the generated code also checking whether it is expired or not 
        if(userByEmail.verifyCode === data.verifyCode){
            if(new Date(userByEmail.verifyCodeExpiry) > new Date()){
                // userByEmail.updatedAt = new Date();
                // userByEmail.isVerified = true;
                await UserModel.findByIdAndUpdate(userByEmail._id, {updatedAt:new Date(), isVerified:true})
                return NextResponse.json({message:"User verified successfully", success:true},{status:200})
            }else{
                return NextResponse.json({message:"Verification code has been expired", success:false},{status:400})
            }
        }else{
            return NextResponse.json({message:"Entered code is not correct", success:false},{status:400})
        }

    }catch(err){
        console.error("Error in verifying the user", err);
        return NextResponse.json({message: "Error in verifying the user", success:false},{ status:500});
    }
}
