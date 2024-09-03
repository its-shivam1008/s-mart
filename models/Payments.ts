import mongoose, {Schema, Document, Types} from "mongoose";

interface Payment extends Document{
    toStore:{
        storeName:string;
        storeId:Types.ObjectId;
    },
    product:{
        productName:string;
        productId:Types.ObjectId;
    },
    fromUser:{
        userEmail:string;
        // userId:Types.ObjectId;
    },
    orderId:String;
    isPaymentVerified:boolean;
    dateofPayment:Date;
    amount:Number;
    paymentMethod:string;
    // transactionId:string;
}

const PaymentSchema:Schema<Payment> = new Schema({
    toStore:{
        storeName:String,
        storeId:Schema.Types.ObjectId
    },
    product:{
        productName:String,
        productId:Schema.Types.ObjectId
    },
    fromUser:{
        userEmail:String,
    },
    orderId:{
        type:String,
    },
    isPaymentVerified:{
        type:Boolean,
        default:false
    },
    dateofPayment:{
        type:Date,
        default:Date.now
    },
    amount:{
        type:Number,
        required:[true, "Amount is required (in paise)"]
    },
    paymentMethod:{
        type:String,
        enum:["razorpay", "stripe", "paytm", "bharatpe", "phonepe"]
    },
    // transactionId:{
    //     type:String
    // }
})

const PaymentModel = (mongoose.models.Payment as mongoose.Model<Payment>) || mongoose.model<Payment>("Payments", PaymentSchema);

export default PaymentModel;