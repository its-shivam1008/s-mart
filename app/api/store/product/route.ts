import StoreModel from "@/models/Store";
import ProductModel from "@/models/Product";
import UserModel from "@/models/User";
import dbConnect from "@/Db/Db";
import { NextResponse, NextRequest } from "next/server";
import { Products } from "@/models/Store";
import { ObjectId, Types } from "mongoose";


export async function POST(req:Request){
    await dbConnect();
    try{
        const data = await req.json();
        // console.log(data)
        // checking the role of the user 
        if(data.session.user.role !== 'StoreOwner'){
            return NextResponse.json({message:"please SignUp as a Store Owner to continue.", success:false}, {status:404});
        }
        const store = await StoreModel.findById(data.payload.storeId);
        // checking the store exists or not 
        if(!store){
            return NextResponse.json({message: "Firstly , please create a store.", success:false},{ status:404});
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
            store.product.push(prod);
            await store.save();
            return NextResponse.json({message: "Product saved successfully", success:true},{ status:200});
        }else{
            return NextResponse.json({message: "Cannot save product", success:false},{ status:400});
        }

    }catch(err){
        console.log(err);
        return NextResponse.json({message: "Internal server error", success:false},{ status:500});
    }
}

export async function PUT(req:Request){
    await dbConnect();
    try{
        const data = await req.json();
        // console.log(data)
        // checking the role of the user 
        if(data.session.user.role !== 'StoreOwner'){
            return NextResponse.json({message:"please SignUp as a Store Owner to continue.", success:false}, {status:404});
        }
        // updating the Product data 
        const updateProduct = await ProductModel.findByIdAndUpdate(data.productId, data.payload);
        if(!updateProduct){
            return NextResponse.json({message:"Product not found", success:false}, {status:404});
        }
        // console.log(updateProduct);
        
        // also updating the array of products in the store model
        if(data.payload.name){

            const updatedStore = await StoreModel.findOneAndUpdate({_id:updateProduct.storeId, 'product.productId':updateProduct._id}, {$set:{
                'product.$.productName':data.payload.name
            }}, {new:true})
            // console.log(updatedStore);
            if(updatedStore){
                return NextResponse.json({message:"Product Updated", success:true}, {status:201})
            }else{
                return NextResponse.json({message:"Product is NOT updated", success:false}, {status:400});
            }

        }

        if(updateProduct){
            return NextResponse.json({message:"Product Updated", success:true}, {status:201})
        }else{
            return NextResponse.json({message:"Product is NOT updated", success:false}, {status:400});
        }
    }catch(err){
        console.log(err);
        return NextResponse.json({message: "Internal server error", success:false},{ status:500});
    }
}

export async function GET(req:NextRequest){
    await dbConnect();
    try{
        // getting the url
        const { searchParams } = new URL(req.url);
        // extracting the value from the queries
        const queryParam = {
            productId: searchParams.get('productId'),
            storeId: searchParams.get('storeId'),
            allProducts: searchParams.get('allProducts'),
            role: searchParams.get('role')
        }
        // checking the role of the user 
        if(queryParam.role !== 'StoreOwner'){
            return NextResponse.json({message:"please SignUp as a Store Owner to continue.", success:false}, {status:404});
        }
        // if storeOwner  wants all the products of the store
        if(queryParam.allProducts){
            // obtaining all the products related to a store. api call looks like => http://localhost:3000/api/store/product/?storeId=66a5128d2ee095f27a5f5d90&role=StoreOwner&allProducts=true allProducts=true is necessary parameter to pass to get all the products
            const products = await ProductModel.find({storeId:queryParam.storeId});
            if (products) {
                return NextResponse.json({message:"All products fetched", products, success:true}, {status:200});
            }else{
                return NextResponse.json({message:"unable to find any product of your store", success:false}, {status:404});
            }
        }else{
            // else storeOwner  wants only one product. api call looks like => http://localhost:3000/api/store/product?productId=66a5fd8ac96764d1687ff36a&role=StoreOwner
            const product = await ProductModel.findById(queryParam.productId);
            if (product) {
                return NextResponse.json({message:"All products fetched", product, success:true}, {status:200});
            }else{
                return NextResponse.json({message:"unable to find any product of your store", success:false}, {status:404});
            }
        }
    }catch(err){
        console.log(err);
        return NextResponse.json({message: "Internal server error", success:false},{ status:500});
    }
}

export async function DELETE(req:Request){
    await dbConnect();
    try{
        // getting the url
        const { searchParams } = new URL(req.url);
        // extracting the value from the queries
        const queryParam = {
            productId: searchParams.get('productId'),
            storeId: searchParams.get('storeId'),
            role: searchParams.get('role')
        }
        // checking the role of the user 
        if(queryParam.role !== 'StoreOwner'){
            return NextResponse.json({message:"please SignUp as a Store Owner to continue.", success:false}, {status:404});
        }
        // deleting the product from products
        const deletedProduct = await ProductModel.findByIdAndDelete(queryParam.productId);
        if(deletedProduct){
            // if it is deleted from products also updating the list of products in the store
            const updatedStore = await StoreModel.findByIdAndUpdate(queryParam.storeId, {$pull:{product:{productId:queryParam.productId}}})
            if(updatedStore){
                return NextResponse.json({message:"Deleted the product successfully", success:true}, {status:200})
            }else{
                return NextResponse.json({message:"CANNOT Delete the product successfully", success:false}, {status:400})
            }
        }else{
            return NextResponse.json({message:"CANNOT Delete the product successfully", success:false}, {status:400})
        }
    }catch(err){
        console.log(err);
        return NextResponse.json({message: "Internal server error", success:false},{ status:500});
    }
}