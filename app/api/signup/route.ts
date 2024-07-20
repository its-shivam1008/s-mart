import dbConnect from "@/Db/Db";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    await dbConnect();
    const res = await request.json();
    const newUser = new UserModel(res);
    const response = await newUser.save();
    return NextResponse.json({response, status:200})
}