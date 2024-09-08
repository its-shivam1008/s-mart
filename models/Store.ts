import mongoose, {Schema, Types, Document} from "mongoose";

export interface Products extends Document{
    productName:string;
    productId:Types.ObjectId;
}

export interface Store extends Document {
    owner_name:string;
    associatedUser:{
        userEmail:string;
        userId:Types.ObjectId;
    }
    contact:string;
    businessName:string;
    storeName:string;
    storeLogo:string;
    category:{
        categoryId:Types.ObjectId;
        categoryName:string;
    }
    product:Products[];
    businessAddress:{
        address:string;
        street:string;
        pincode:string;
        state:string;
        city:string;
        country:string;
    }
    razorpay:{
        id:string;
        secret:string;
    }
    createdAt:Date;
    updatedAt:Date;
}

const StoreSchema:Schema<Store> = new Schema({
    owner_name:{
        type:String,
        required:[true, "Name of the store owner is required"]
    },
    associatedUser:{
        userEmail:String,
        userId:{
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    },
    contact:{
        type:String,
        required:[true, "Contact number of the store owner is required"]
    },
    businessName:{
        type:String,
        required:[true, "name of business is required"]
    },
    storeName:{
        type:String,
        required:[true, "Store name is required"]
    },
    storeLogo:{
        type:String,
        required:[true, "Store Logo is required"]
    },
    category:{
        categoryName:String,
        categoryId:{
            type:Types.ObjectId,
            ref:'ParentCategory'
        }
    },
    product:[
        {
            productName:String,
            productId:{
                type:Types.ObjectId,
                ref:'Product'
            }
            
        }
    ],
    businessAddress:{
        address:{
            type:String
        },
        street:{
            type:String
        },
        pincode:{
            type:String
        },
        state:{
            type:String
        },
        city:{
            type:String
        },
        country:{
            type:String
        }
    },
    razorpay:{
        id:String,
        secret:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})

const StoreModel = (mongoose.models.Store as mongoose.Model<Store>) || mongoose.model<Store>("Store", StoreSchema);

export default StoreModel;