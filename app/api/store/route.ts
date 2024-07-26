import StoreModel from "@/models/Store";
import UserModel from "@/models/User";
import dbConnect from "@/Db/Db";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    await dbConnect();
    try{
        const data = await req.json();
        const userByEmail = await UserModel.findOne({email:data.session.user.email});
        // checking the user is present in the db or not, if yes is he signed up as a store oner of not 
        if(!userByEmail){
            return NextResponse.json({message: "user not saved try to sign up again", success:false},{ status:404});
        }else if(userByEmail?.role !== 'StoreOwner'){
            return NextResponse.json({message:"please SignUp as a Store Owner to continue.", success:false}, {status:404});
        }
        //validating the data using zod
        // todo:

        // saving the store information 
        const newData = {...data.payload, userId:userByEmail._id}
        const newStore = new StoreModel(newData);
        await newStore.save();

        // send a welcome email
        // todo :
        return NextResponse.json({message:"Saved the store data", success:true},{status:201})
    }catch(err){
        return NextResponse.json({message: "Internal server error", success:false},{ status:500});
    }
}

export async function PUT(req:Request){
    await dbConnect();
    try{
        const data = await req.json();
        const userByEmail = await UserModel.findOne({email:data.session.user.email});
        // checking the user is present in the db or not, if yes is he signed up as a store owner or not 
        if(!userByEmail){
            return NextResponse.json({message: "user not saved try to sign up again", success:false},{ status:404});
        }else if(userByEmail?.role !== 'StoreOwner'){
            return NextResponse.json({message:"please SignUp as a Store Owner to continue.", success:false}, {status:404});
        }
        //validating the data using zod
        // todo:

        // updating the store information 
        await StoreModel.findOneAndUpdate({userId:userByEmail._id}, data.payload);

        // send a welcome email
        // todo :
        return NextResponse.json({message:"Updated the store data", success:true},{status:201})
    }catch(err){
        return NextResponse.json({message: "Internal server error", success:false},{ status:500});
    }
}