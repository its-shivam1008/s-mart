import dbConnect from "@/Db/Db";
import PaymentModel from "@/models/Payments";
import StoreModel from "@/models/Store";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
// import Payment from "@/models/Payment";
// import Razorpay from "razorpay";
// import connectDB from "@/Db/dbConnect";
// import User from "@/models/User";


export const POST  = async (req:Request)=> {
    await dbConnect();
    try{
        let body:any = await req.formData();
        body = Object.fromEntries(body);
        // const body = await req.json();
        // console.log(body);
    
        let p = await PaymentModel.findOne({orderId: body.razorpay_order_id});
        if(!p){
            return NextResponse.json({success: false, message:"Order id not found"},{ status:404});
        }
        let store = await StoreModel.findById(p.toStore.storeId);
        if(!store){
            return NextResponse.json({success: false, message:"Store not found"},{ status:404});
        }
        const secret = store.razorpay.secret
    
        let xx = validatePaymentVerification({"order_id": body.razorpay_order_id, "payment_id":  body.razorpay_payment_id}, body.razorpay_signature, secret);
    
        if(xx){
            const updatedPayment = await PaymentModel.findOneAndUpdate({orderId: body.razorpay_order_id}, {isPaymentVerified: true}, {new:true});
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/checkout?productId=${updatedPayment?.product.productId}&paymentdone=true`, { status: 302 });
        }else{
            // return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/profile/tip/${updatedPayment.to_name}?paymentdone=false`);
            return NextResponse.json({success: false, message:"Payment verification failed"});
        }

    }catch(err){
        return NextResponse.json({message: "Internal server error", success:false, error:err},{ status:500});
    }
}