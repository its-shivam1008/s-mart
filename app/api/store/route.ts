import StoreModel from "@/models/Store";
import UserModel from "@/models/User";
import dbConnect from "@/Db/Db";
import { NextRequest, NextResponse } from "next/server";
import ParentCategoryModel from "@/models/ParentCategory";

export async function POST(req:Request){
    await dbConnect();
    try{
        const data = await req.json();
        console.log(data)
        console.log(data.session.user)
        const userByEmail = await UserModel.findOne({email:data.session.user.email});
        // checking the user is present in the db or not, if yes is he signed up as a store oner of not 
        if(!userByEmail){
            return NextResponse.json({message: "user not saved try to sign up again", success:false},{ status:404});
        }else if(userByEmail.role !== 'StoreOwner'){
            return NextResponse.json({message:"please SignUp as a Store Owner to continue.", success:false}, {status:404});
        }
        //validating the data using zod
        // todo:

        //finding the id of the the respective category putting it into the payload and also putting the store logo as the imageUrl specified in the session
        const category_Id = await ParentCategoryModel.findOne({name:data.payload.category.categoryName})
        if(category_Id){
            data.payload.category.categoryId = category_Id;
            data.payload.storeLogo = data.session.user.image ? data.session.user.image : 'no Url Found As user Signed up With Creds'
        }
        // saving the store information 
        console.log(data)
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
        console.log(data)
        console.log(data.session.user)
        const userByEmail = await UserModel.findOne({email:data.session.user.email});
        // checking the user is present in the db or not, if yes is he signed up as a store oner of not 
        if(!userByEmail){
            return NextResponse.json({message: "user not saved try to sign up again", success:false},{ status:404});
        }else if(userByEmail.role !== 'StoreOwner'){
            return NextResponse.json({message:"please SignUp as a Store Owner to continue.", success:false}, {status:404});
        }

        // finding the store using the associated user
        const store = await StoreModel.findOneAndUpdate({'associatedUser':{'userEmail':userByEmail.email,'userId':userByEmail._id}}, data.payload)

        // if(data.session.user.role !== 'StoreOwner'){
        //     return NextResponse.json({message:"please SignUp as a Store Owner to continue.", success:false}, {status:404});
        // }

        //validating the data using zod
        // todo:

        // updating the store information 
        // const store = await StoreModel.findOneAndUpdate(data.id, data.payload)

        if(!store){
            return NextResponse.json({message:"Store data not updated", success:false}, {status:400});
        }
        return NextResponse.json({message:"Updated the store data", success:true},{status:201})
    }catch(err){
        return NextResponse.json({message: "Internal server error", success:false},{ status:500});
    }
}

export async function GET(req:NextRequest){
    await dbConnect();
    try{
        // gettng the email from the parameter 
        const {searchParams } = new URL(req.url);
        const queryParam = {
            email : searchParams.get('email')
        }
        // getting the user whose role is a store owner else returning the error.
        const getUser = await UserModel.findOne({email:queryParam.email, role:"StoreOwner"});
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