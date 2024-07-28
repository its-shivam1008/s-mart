import StoreModel from "@/models/Store";
import ProductModel from "@/models/Product";
import UserModel from "@/models/User";
import dbConnect from "@/Db/Db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req:NextRequest, context:{params:{storeId:string}}){
    await dbConnect();
    try{
        //getting the storeId
        const {storeId} = context.params;
        const products = await ProductModel.find({storeId:storeId});
        if (products) {
            return NextResponse.json({message:"All products fetched", products, success:true}, {status:200});
        }else{
            return NextResponse.json({message:"unable to find any product of your store", success:false}, {status:404});
        }
    }catch(err){
        console.log(err);
        return NextResponse.json({message: "Internal server error", success:false},{ status:500});
    }
}

export async function DELETE(req:Request){
    await dbConnect();
    try{
        const { searchParams } = new URL(req.url);
        const queryParam = {
            productId: searchParams.get('productId')
        }
    }catch(err){
        console.log(err);
        return NextResponse.json({message: "Internal server error", success:false},{ status:500});
    }
}