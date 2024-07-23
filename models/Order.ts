import mongoose, {Schema, Document, Types} from "mongoose";

interface Order extends Document{
    user:{
        username:string;
        userId:Types.ObjectId;
    },
    product:{
        productName:string;
        productId:Types.ObjectId;
    },
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
    quantity:Number;
    totalPrice:Number;
    trackingNumber:String;
}

const OrderSchema:Schema<Order> = new Schema({
    user:{
        username:String,
        userId:Schema.Types.ObjectId,
        ref:"User"
    },
    product:{
        productName:String,
        productId:Schema.Types.ObjectId,
        ref:"Product"
    },
    status:{
        type:String,
        enum:["Pending", "Confirmed", "Shipped", "Deliverd", "Cancelled"]
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
    trackingNumber:{
        type:String
    }
})

const OrderModel = (mongoose.models.Order as mongoose.Model<Order>) || mongoose.model<Order>("Order", OrderSchema);

export default OrderModel;