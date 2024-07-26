import dbConnect from "@/Db/Db";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";


export async function POST(req:Request){
    await dbConnect();
    try{
        const data = await req.json();
        const userByEmail = await UserModel.findOne({email:data.session.user.email});
        if(!userByEmail){
            return NextResponse.json({message: "user not saved try to sign up again", success:false},{ status:400});
        }
        // now also generate the verifyCode and verifyCodeExpiry
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours()+1);

        // saving password, verifyCode, verifyExpiryDate in user
        userByEmail.password = data.password;
        userByEmail.updatedAt = new Date();
        userByEmail.verifyCode = verifyCode;
        userByEmail.verifyCodeExpiry = expiryDate;
        userByEmail.role = data.role;

        await userByEmail.save();

        //send verification email
        const emailResponse = await sendVerificationEmail(data.session.user.email,data.session.user.username,verifyCode)
        if(!emailResponse.success){
            return NextResponse.json({message:emailResponse.message, success:false},{status:500})
        }
        return NextResponse.json({message:emailResponse.message, success:true},{status:201})

    }catch(err){
        console.error("Error saving the password", err);
        return NextResponse.json({message: "Error saving the password", success:false},{ status:500});
    }
}