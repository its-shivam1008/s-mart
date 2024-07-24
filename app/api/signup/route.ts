import dbConnect from "@/Db/Db";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";
import { signUpSchema } from "@/schemas/signUpSchema";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(req:Request){
    try{
        // connecting to db and extracting data from body of request
        await dbConnect();
        const data = await req.json(); 
        // finding an existing user by username and is verified
        const userByUsername = await UserModel.findOne({username:data.username, isVerified:true});
        if(userByUsername){
            // means username already taken 
            return NextResponse.json({success:false, message:"Username is already taken"}, {status:400});
        }
        // finding user by email
        const userByEmail = await UserModel.findOne({email:data.email});
        // generating verify code and verify code expiry
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours()+1);
        if(userByEmail){
            if(userByEmail.isVerified){
                return NextResponse.json({success:false, message:"User with this email already exists"}, {status:400});
            }else{
                // user with the email exist but not verified so we take user's new password and generate new otp 
                userByEmail.password = data.password;
                userByEmail.verifyCode = verifyCode;
                userByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await userByEmail.save();
            }
        }else{
            // email does not exist means the user is new we need
            // validating the user's info using zod  
            const payload = {
                email:data.email,
                username:data.username,
                password:data.password
            }
            const validation = signUpSchema.safeParse(payload);
            if(!validation.success){
                return NextResponse.json({message:validation.error.issues[0].message},{status:400})
            }
            // saving the new user into our database
            const newData = {...data, verifyCode, verifyCodeExpiry:expiryDate}
            const newUser = new UserModel(newData);
            await newUser.save();
        }
        //send verification email
        const emailResponse = await sendVerificationEmail(data.email,data.username,verifyCode)
        if(!emailResponse.success){
            return NextResponse.json({message:emailResponse.message, success:false},{status:500})
        }
        return NextResponse.json({message:emailResponse.message, success:true},{status:201})
    }catch(err){
        return NextResponse.json({message: "Internal server error", success:false},{ status:500});
    }
}