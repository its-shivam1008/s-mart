import mongoose, {Schema, Document, Types} from "mongoose";

interface Order extends Document{
    user:{
        userEmail:string;
    },
    product:{
        productName:string;
        productId:Types.ObjectId;
    },
    storeId:Types.ObjectId;
    status:string;
    orderDate:Date;
    shippingDate:Date;
    shippingAddress:{
        address:string;
        street:string;
        pincode:number;
        state:string;
        city:string;
    }
    quantity:number;
    totalPrice:number;
    payment:{
        paymentId:Types.ObjectId;
        isVerified:boolean;   
    }
}

const OrderSchema:Schema<Order> = new Schema({
    user:{
        userEmail:String,
    },
    product:{
        productName:String,
        productId:{
            type:Schema.Types.ObjectId,
            ref:'Product'
        }
    },
    storeId:{
        type:Schema.Types.ObjectId,
        ref:'Store'
    },
    status:{
        type:String,
        enum:["Pending", "Confirmed", "Shipped", "Deliverd", "Cancelled"],
        default:"Pending"
    },
    orderDate:{
        type:Date,
        default:Date.now
    },
    shippingDate:{
        type:Date
    },
    shippingAddress:{
        address:{
            type:String
        },
        street:{
            type:String
        },
        pincode:{
            type:Number
        },
        state:{
            type:String
        },
        city:{
            type:String
        },
    },
    quantity:{
        type:Number
    },
    totalPrice:{
        type:Number
    },
    payment:{
        paymentId:{
            type:Schema.Types.ObjectId,
            ref:'Payments'
        },
        isVerified:Boolean
    }
})

const OrderModel = (mongoose.models.Order as mongoose.Model<Order>) || mongoose.model<Order>("Order", OrderSchema);

export default OrderModel;