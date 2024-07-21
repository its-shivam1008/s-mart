import dbConnect from "@/Db/Db";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";
import { signUpSchema } from "@/schemas/signUpSchema";

export async function POST(req:Request, res:Response){
    try{
        await dbConnect();
        const data = await req.json();
        const payload = {
            email:data.email,
            username:data.username,
            password:data.password
        }
        const validation = signUpSchema.safeParse(payload);
        if(!validation.success){
            return NextResponse.json({message:validation.error.issues[0].message},{status:400})
        }
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours()+1);
        const newData = {...data, verifyCode, verifyCodeExpiry:expiryDate}
        console.log(verifyCode, expiryDate, newData);
        const newUser = new UserModel(newData);
        const response = await newUser.save();
        return NextResponse.json({response},{status:200});
    }catch(err){
        return NextResponse.json({message: "Internal server error"},{ status:500});
    }
}