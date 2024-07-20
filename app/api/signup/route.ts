import dbConnect from "@/Db/Db";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";
import { signUpSchema } from "@/schemas/signUpSchema";

export async function POST(request:Request){
    await dbConnect();
    const res = await request.json();
    signUpSchema.parse({
        email:res.email,
        username:res.username,
        password:res.password
    })
    const newUser = new UserModel(res);
    const response = await newUser.save();
    return NextResponse.json({response, status:200})
}