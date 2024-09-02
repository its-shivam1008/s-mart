import mongoose, {Schema, Document, Types} from "mongoose";
import { NextResponse } from "next/server";

export interface Reviews {
    userEmail:string;
    review:string;
    star:number;
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
    priceAfterDiscount:number;
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
    priceAfterDiscount:{
        type:Number,
        // required:[true, "Price after discount is required"]
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

ProductSchema.pre('save', async function(next){
    // console.log('pote ki chala hai')
    const product = this;
    if (!product.isModified('price') && !product.isModified('discount')) {
        return NextResponse.next();
    }
    // if(product.isModified('product')) return NextResponse.next();
    try{
        if(product.price || product.discount){
            // console.log('ye chal raha hai')
            const priceAfterDis = product.price - ((product.discount/100)*product.price)
            product.priceAfterDiscount = priceAfterDis;
            NextResponse.next();
        }else{
            NextResponse.next();
        }
    }catch(err:any){
        return NextResponse.next(err);
    }
})


const ProductModel = (mongoose.models.Product as mongoose.Model<Product>) || mongoose.model<Product>("Product", ProductSchema);

export default ProductModel;