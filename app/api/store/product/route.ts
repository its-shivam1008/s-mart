import StoreModel from "@/models/Store";
import ProductModel from "@/models/Product";
import dbConnect from "@/Db/Db";
import { NextResponse } from "next/server";
import { Products } from "@/models/Store";
import { ObjectId, Types } from "mongoose";


export async function POST(req:Request){
    await dbConnect();
    try{
        const data = await req.json();
        const userByUserId = await StoreModel.findOne({userId:data.session.user.userId});
        // checking the user is present in the db or not, if yes is he signed up as a store oner of not 
        if(!userByUserId){
            return NextResponse.json({message: "user not saved try to sign up again", success:false},{ status:404});
        }
        //saving the data in product
        const productData = new ProductModel(data.payload);
        const saveProduct = await productData.save();


        // saving the product information in the store product array to the store's product list
        if(saveProduct){
            const prod:Products = {
                productName:saveProduct.name,
                productId:saveProduct._id
            } as Products
            userByUserId.product.push(prod);
            await userByUserId.save();
            return NextResponse.json({message: "Product saved successfully", success:true},{ status:200});
        }else{
            return NextResponse.json({message: "Cannot save product", success:false},{ status:400});
        }

    }catch(err){
        return NextResponse.json({message: "Internal server error", success:false},{ status:500});
    }
}