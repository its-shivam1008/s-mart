import dbConnect from "@/Db/Db";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import OrderModel from "@/models/Order";
// import ProductModel from "@/models/Product";
import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import ProductModel from "@/models/Product";

export async function POST(req:Request){
    await dbConnect();
    try{
        const data = await req.json();
        // getting the query 
        // console.log(data)
        const {searchParams} = new URL(req.url);
        // exptracting the username and userId from the queryParams
        const queryParam = {
            userEmail: searchParams.get('userEmail'),
        }
        const user = {
            userEmail:queryParam.userEmail,
        }
        const prod = await ProductModel.findById(data.payload.product._id)
        if(!prod){
            return NextResponse.json({message:"Product not found", success:false}, {status:404})
        }
        const product = {
            productName:prod.name,
            productId:data.payload.product._id
        }
        const storeId = prod.storeId
        const status = data.payload.status
        const today = new Date();
        today.setDate(today.getDate() + 7); // shipping date is 7 days after the the order date 
        const shippingDate = today;
        const quantity = data.payload.quantity
        const totalPrice = data.payload.totalPrice
        const order =  new OrderModel({
            user, product, storeId, status, shippingDate, quantity, totalPrice
        })
        await order.save();
        if(!order){
            return NextResponse.json({message:"Unable to Create order", success:false}, {status:400})
        }
        return NextResponse.json({message:"Created the order", order, success:true}, {status:200})
    }catch(err){
        return NextResponse.json({message:'Internal Server Error', success:false}, {status:500})
    }
}

// only update user can do in order is to cancel it.
export async function PUT(req:Request){
    await dbConnect();
    try{
        // getting the searchParams
        const {searchParams} = new URL(req.url);
        // extracting the query from the searchParam
        const queryParam = {
            cancel:searchParams.get('cancel'), // true or false
            orderId:searchParams.get('orderId')
        }
        if(queryParam.cancel){
            const updatedOrderStatus = await OrderModel.findByIdAndUpdate(queryParam.orderId, {status:'Cancelled'}, {new:true});
            if(!updatedOrderStatus){
                return NextResponse.json({message:"Unable to Cancel order", success:false}, {status:400})
            }
            return NextResponse.json({message:"Order cancelled", success:true}, {status:200})
        }else{
            return NextResponse.json({message:'cancel flag is not passed in the query', success:false}, {status:400})
        }
    }catch(err){
        return NextResponse.json({message:'Internal Server Error', success:false}, {status:500})
    }
}

// get all the orders according to the user
export async function GET(req:Request){
    await dbConnect();
    try{
        const {searchParams} = new URL(req.url)
        const queryParam = {
            username:searchParams.get('username'),
        }
        const orders = await OrderModel.find({"user.username":queryParam.username})
        console.log(orders)
        if(!orders){
            return NextResponse.json({message:'Cannot get orders', success:false}, {status:400})
        }
        return NextResponse.json({message:'Orders are fetched', orders:orders, success:true}, {status:200})
    }catch(err){
        return NextResponse.json({message:'Internal Server Error', success:false}, {status:500})
    }
}