import dbConnect from "@/Db/Db";
import OrderModel from "@/models/Order";
import StoreModel from "@/models/Store";
import { NextResponse } from "next/server";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

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


// maybe the PUT to update the order status is being implemented by the debouncing like username debouncing
export async function PUT(req:Request){
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user:User = session?.user as User
    if(!session || !session.user){
        return NextResponse.json({message:"Not authenticated", success:false}, {status:401});
    }
    if(user.role !== "StoreOwner"){
        return NextResponse.json({message:"Not authenticated, Not a StoreOwner", success:false}, {status:401});
    }
    try{
        const {searchParams} = new URL(req.url);
        const queryParam = {
            orderId:searchParams.get('orderId'),
            status:searchParams.get('status')
        }
        const updatedOrder = OrderModel.findByIdAndUpdate(queryParam.orderId, {status:queryParam.status}, {new:true})
        if(!updatedOrder){
            return NextResponse.json({message:"Unable to update order status", success:false}, {status:400})
        }
        return NextResponse.json({message:"Updated the order status", success:true}, {status:200})
        
    }catch(err){
        return NextResponse.json({message:"Internal server error", success:false}, {status:500})
    }
}

// store owner can only delete the order if it is been cancelled by the user

export async function DELETE(req:Request){
    await dbConnect();
    try{
        // getting the search params
        const {searchParams} = new URL(req.url);
        // extracting the params from the query
        const queryParam = {
            orderId:searchParams.get('orderId'),
        }
        // finding the order by Id and deleteing it
        const deleteOrder = await OrderModel.findByIdAndDelete(queryParam.orderId);
        if(!deleteOrder){
            return NextResponse.json({message:"Unable to delete order", success:false}, {status:400})
        }
        return NextResponse.json({message:"Order deleted", success:true}, {status:200})
    }catch(err){
        return NextResponse.json({message:"Internal server error", success:false}, {status:500})
    }
}