"use server";
import Razorpay from "razorpay"
import dbConnect from "@/Db/Db";
import UserModel from "@/models/User";
import PaymentModel from "@/models/Payments";
import StoreModel, { Store } from "@/models/Store";

interface PaymentForm {
    productName:string;
    productId:string;
    userEmail:string;
}


export const initiate = async(amount:number, storeId:string, paymentform:PaymentForm) =>{
    await dbConnect();
    const objId = JSON.parse(storeId)
    const store = await StoreModel.findById(objId)
    if(!store){
        return {message:'Cannot find store', success:false}
    }
    var instance = new Razorpay({ key_id:store.razorpay.id, key_secret: store.razorpay.secret });
    
    let options = {
        amount: amount,
        currency:"INR"
    }

    let ordersCreation = await instance.orders.create(options)

    const payment = new PaymentModel({
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
    await payment.save()

    return ordersCreation;
}


export const findStoreByProduct = async (productId:string) => {
    await dbConnect();
    try{
        const store = await StoreModel.findOne({
            'product.productId': productId
        });
        if(!store){
            // console.log({message:'Store not found', success:false})
            // console.log(store)
            return {message:'Store not found', success:false}
        }
        // console.log(store)
        return {message:'Store found', success:true, storeId:JSON.stringify(store._id), razorpayId:store.razorpay.id}
    }catch(err){
        return {message:'Some error happened', success:false, error:JSON.stringify(err)}
    }
}