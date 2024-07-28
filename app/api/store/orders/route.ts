import dbConnect from "@/Db/Db";
import OrderModel from "@/models/Order";
import StoreModel from "@/models/Store";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
    await dbConnect();
    try{
        // getting the url
        const {searchParams} = new URL(req.url);
        // extracting the queries
        const queryParam={
            role:searchParams.get('role'),
            storeId:searchParams.get('storeId')
        }
        // checking the role of the user 
        if(queryParam.role !== 'StoreOwner'){
            return NextResponse.json({message:"please SignUp as a Store Owner to continue.", success:false}, {status:404});
        }
        const orders = await OrderModel.find({storeId:queryParam.storeId});
        if(orders){
            return NextResponse.json({message:"All orders are fetched", success:true}, {status:200})
        }else{
            return NextResponse.json({message:"No orders found", success:true}, {status:200});
        }

    }catch(err){
        return NextResponse.json({message:"Internal server error", success:false}, {status:500})
    }
}


// maybe the PUT to update the order status is being mplemented by the debouncing like username debouncing