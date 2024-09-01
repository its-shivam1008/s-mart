import mongoose, {Schema, Document, Types} from "mongoose";

interface Reviews {
    userEmail:string;
    review:string;
    ratings:number;
}

interface Product extends Document{
    name:string;
    description:string;
    specification:string;
    quantity:number;
    category:{
        parentCategory:{
            name:string;
            id:Schema.Types.ObjectId;
        };
        subCategory:{
            name:string;
            id:Schema.Types.ObjectId;
        };
    };
    storeId:Schema.Types.ObjectId;
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
        parentCategory:{
            name:String,
            id:{
                type:Schema.Types.ObjectId,
                ref:'ParentCategory'
            }
        },
        subCategory:{
            name:String,
            id:{
                type:Schema.Types.ObjectId,
                ref:'SubCategory'
            }
        }
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
            userEmail:{
                type:String,
                ref:'User',
                required:true
            },
            review:{
                type:String,
                required:true
            },
            star:{
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