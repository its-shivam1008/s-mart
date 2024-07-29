import dbConnect from "@/Db/Db";
import OrderModel from "@/models/Order";
import StoreModel from "@/models/Store";
import UserModel from "@/models/User";
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
            return NextResponse.json({message:"All orders are fetched", orders, success:true}, {status:200})
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
    try{
        const data = await req.json();
        const userByEmail = await UserModel.findOne({email:data.session.user.email});
        // checking the user is present in the db or not, if yes is he signed up as a store oner of not 
        if(!userByEmail){
            return NextResponse.json({message: "user not saved try to sign up again", success:false},{ status:404});
        }else if(userByEmail.role !== 'StoreOwner'){
            return NextResponse.json({message:"please SignUp as a Store Owner to continue.", success:false}, {status:404});
        }
        const {searchParams} = new URL(req.url);
        const queryParam = {
            orderId:searchParams.get('orderId'),
            status:searchParams.get('status')
        }
        const updatedOrder = await OrderModel.findByIdAndUpdate(queryParam.orderId, {status:queryParam.status})
        if(!updatedOrder){
            return NextResponse.json({message:"Unable to update order status", success:false}, {status:400})
        }
        return NextResponse.json({message:"Updated the order status", updatedOrder, success:true}, {status:200})
        
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
        const order = await OrderModel.findById(queryParam.orderId);
        if(!order){
            return NextResponse.json({message:"Order is not found", success:false}, {status:400})
        }
        if(order.status !== 'Cancelled'){
            return  NextResponse.json({message:"Cannot delete a Order which is not cancelled by the user", success:false}, {status:400})
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