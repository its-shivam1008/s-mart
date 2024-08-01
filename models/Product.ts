import mongoose, {Schema, Document, Types} from "mongoose";

interface Reviews {
    userId:Types.ObjectId;
    review:string;
    ratings:number;
}

interface Product extends Document{
    name:string;
    description:string;
    specification:string;
    quantity:number;
    category:{
        parentCategory:string;
        subCategory:string;
    };
    storeId:Types.ObjectId;
    price:number;
    discount:number;
    shippingCharge:number;
    userReviews:Reviews[];
    images:string[];
    createdAt:Date;
    updatedAt:Date;
}

const ProductSchema:Schema<Product> = new Schema({
    name:{
        type:String,
        required:[true, "name is required"]
    },
    description:{
        type:String,
        required:[true, "description is required"]
    },
    specification:{
        type:String,
        required:[true, "Specification is required"]
    },
    quantity:{
        type:Number,
        required:[true, "quantity of items is required"]
    },
    category:{
        parentCategory:String,
        subCategory:String
    },
    storeId:{
        type:Schema.Types.ObjectId,
        ref:'Store',
    },
    price:{
        type:Number,
        required:[true, "write the price"]
    },
    discount:{
        type:Number,
        required:[true, "write the discount"],
        default:0
    },
    shippingCharge:{
        type:Number,
        required:[true, "write the shippingCharges"],
        default:0
    },
    userReviews:[
        {
            userId:{
                type:Schema.Types.ObjectId,
                ref:'User',
                required:true
            },
            review:{
                type:String,
                required:true
            },
            ratings:{
                type:Number,
                required:true
            }
        }
    ],
    images:{
        type:[String],
        required:[true, "Images of the product are required"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
})

const ProductModel = (mongoose.models.Product as mongoose.Model<Product>) || mongoose.model<Product>("Product", ProductSchema);

export default ProductModel;