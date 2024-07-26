import mongoose, {Schema, Types, Document} from "mongoose";

interface Products {
    productName:string;
    productId:Types.ObjectId;
}

interface Store extends Document {
    owner_name:string;
    userId:Types.ObjectId;
    contact:string;
    email:string;
    password:string;
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
        pincode:number;
        state:string;
        city:string;
        country:string;
    }
    taxDetails:{
        gstNumber:string;
        pan:string;
    }
    bankDetails:{
        accountNumber:string;
        IFSC:string;
        bankName:string;
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
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    contact:{
        type:String,
        required:[true, "Contact number of the store owner is required"]
    },
    email:{
        type:String,
        required:[true, "email is required"],
        unique:true,
        match:[/.+\@.+\..+/, "Please provide a valid email address"]
    },
    password:{
        type:String,
        required:[true, "password is required"]
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
        categoryId:String
    },
    product:[
        {
            productName:String,
            productId:Types.ObjectId,
            ref:'Product'
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
            type:Number
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
    taxDetails:{
        gstNumber:String,
        pan:String
    },
    bankDetails:{
        bankName:String,
        accountNumber:String,
        IFSC:String
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