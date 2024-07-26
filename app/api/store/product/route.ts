import StoreModel from "@/models/Store";
import ProductModel from "@/models/Product";
import dbConnect from "@/Db/Db";
import { NextResponse } from "next/server";
import { Products } from "@/models/Store";
import { Types } from "mongoose";


export async function POST(req:Request){
    await dbConnect();
    try{
        const data = await req.json();
        //saving the data in product
        const productData = new ProductModel(data.payload);
        const product = await productData.save();

        const userByUserId = await StoreModel.findOne({userId:data.session.user.userId});
        // checking the user is present in the db or not, if yes is he signed up as a store oner of not 
        if(!userByUserId){
            return NextResponse.json({message: "user not saved try to sign up again", success:false},{ status:404});
        }

        // saving the product information in the store product array
        if(product){
        }
        
        userByUserId.product.push( {
            productName:product.name,
            productId:product._id as unknown as Types.ObjectId
        });
        await userByUserId.save();

    }catch(err){
        return NextResponse.json({message: "Internal server error", success:false},{ status:500});
    }
}