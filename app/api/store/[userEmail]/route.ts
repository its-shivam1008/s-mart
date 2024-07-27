import StoreModel from "@/models/Store";
import UserModel from "@/models/User";
import dbConnect from "@/Db/Db";
import { NextRequest, NextResponse } from "next/server";

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
        const newData = {...data.payload, associatedUser:{userEmail:userByEmail.email, userId:userByEmail._id}}
        const newStore = new StoreModel(newData);
        await newStore.save();

        // send a welcome email
        // todo :
        return NextResponse.json({message:"Saved the store data", success:true},{status:201})
    }catch(err){
        console.log(err);
        return NextResponse.json({message: "Internal server error", success:false, error:err},{ status:500});
    }
}

export async function PUT(req:Request){
    await dbConnect();
    try{
        const data = await req.json();
        // // checking the user is present in the db or not, if yes is he signed up as a store owner or not 
        const getUser = await UserModel.findOne({email:data.session.user.email, role:"StoreOwner"});
        if(!getUser){
            return NextResponse.json({message: "user not saved try to sign up again", success:false},{ status:404});
        }else if(getUser?.role !== 'StoreOwner'){
            return NextResponse.json({message:"please SignUp as a Store Owner to continue.", success:false}, {status:404});
        }

        //validating the data using zod
        // todo:

        // updating the store information 
        const store = await StoreModel.findByIdAndUpdate(data.id, data.payload)

        // send a welcome email
        // todo :
        return NextResponse.json({message:"Updated the store data", success:true},{status:201})
    }catch(err){
        return NextResponse.json({message: "Internal server error", success:false},{ status:500});
    }
}

export async function GET(req:NextRequest, context:{params:{email:string}}){
    await dbConnect();
    try{
        // gettng the email from the parameter 
        const {email} =context.params;
        // getting the user whose role is a store owner else returning the error.
        const getUser = await UserModel.findOne({email:email, role:"StoreOwner"});
        if(!getUser){
            return NextResponse.json({message: "user not saved try to sign up again", success:false},{ status:404});
        }else if(getUser?.role !== 'StoreOwner'){
            return NextResponse.json({message:"please SignUp as a Store Owner to continue.", success:false}, {status:404});
        }
        // getting the storeDetails from the db and returning the data to the user
        const associatedUser = {userEmail:getUser.email, userId:getUser._id} // here in the findOne query the object sequence matters for finding the data
        const getStoreData = await StoreModel.findOne({associatedUser:associatedUser});
        return NextResponse.json({getUser, getStoreData, success:true},{status:201})
    }catch(err){
        console.log(err)
        return NextResponse.json({message: "Internal server error", success:false, err},{ status:500});
    }
}