import dbConnect from "@/Db/Db";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import OrderModel from "@/models/Order";
// import ProductModel from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    await dbConnect();
    // getting the session 
    const session = await getServerSession(authOptions);
    // extracting the user from the session 
    const userSes:User = session?.user as User
    if(!session || !session.user){
        return NextResponse.json({message:"Not authenticated", success:false}, {status:401});
    }
    // extracting the id and username from the user
    const userId = userSes._id;
    const username = userSes.username;
    try{
        const data = await req.json();
        const user = {
            username:username,
            userId:userId
        }
        const product = {
            productName:data.payload.product.name,
            productId:data.payload.product._id
        }
        const storeId = data.payload.product.storeId
        const status = data.status
        const today = new Date();
        today.setDate(today.getDate() + 7); // shipping date is 7 days after the the order date 
        const shippingDate = today;
        const quantity = data.quantity
        const totalPrice = data.payload.product.price
        const order =  new OrderModel({
            user, product, storeId, status, shippingDate, quantity, totalPrice
        })
        if(!order){
            return NextResponse.json({message:"Unable to Create order", success:false}, {status:400})
        }
        return NextResponse.json({message:"Created the order", success:true}, {status:200})
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