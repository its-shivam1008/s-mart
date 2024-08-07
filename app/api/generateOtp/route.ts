import dbConnect from "@/Db/Db";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export async function PUT(req:Request){
    await dbConnect();
    try{
        const data = await req.json();
        // console.log(data)
        //finding the user is present in the db or not
        const userByEmail = await UserModel.findOne({email:data.sessionObject.user.email});
        if(!userByEmail){
            return NextResponse.json({message: "user not saved try to sign up again", success:false}, {status:404})
        }

        // now also generate the verifyCode and verifyCodeExpiry
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours()+1);

        //updating the user's verifyCode and codeExpiryDate 
        await UserModel.findByIdAndUpdate(userByEmail._id, {verifyCode:verifyCode, verifyCodeExpiry:expiryDate, updatedAt: new Date()});

        //sending the verification email again
        const emailResponse = await sendVerificationEmail(data.sessionObject.user.email,data.sessionObject.user.username,verifyCode)
        if(!emailResponse.success){
            return NextResponse.json({message:emailResponse.message, success:false}, {status:400})
        }
        return NextResponse.json({message:emailResponse.message, success:true}, {status:200})

    }catch(err){
        console.error(err);
        return NextResponse.json({message:"error sending the code", success:false}, {status:500})
    }
}