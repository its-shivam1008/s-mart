"use server";
import Razorpay from "razorpay"
import dbConnect from "@/Db/Db";
import UserModel from "@/models/User";
import PaymentModel from "@/models/Payments";
import StoreModel from "@/models/Store";

interface PaymentForm {
    productName:string;
    productId:string;
    userEmail:string;
}


export const initiate = async(amount:string, storeId:string, paymentform:PaymentForm) =>{
    await dbConnect();
    const store = await StoreModel.findById(storeId)
    if(!store){
        return {message:'Cannot find store', success:false}
    }
    var instance = new Razorpay({ key_id:store.razorpay.id, key_secret: store.razorpay.secret });
    
    let options = {
        amount: Number.parseInt(amount),
        currency:"INR"
    }

    let ordersCreation = await instance.orders.create(options)

    await PaymentModel.create({
        orderId: ordersCreation.id,
        amount: amount,
        toStore:{
            storeName:store.storeName,
            storeId:store._id
        },
        product:{
            productName:paymentform.productName,
            productId:paymentform.productId
        },
        fromUser:{
            userEmail:paymentform.userEmail
        },
        paymentMethod:'razorpay'
    })

    return ordersCreation;
}