import mongoose, {Schema, Document} from "mongoose";
import bcrypt from 'bcrypt';

interface CartObj {
    productId:string;
    price:number;
    quantity:number;
}

export interface User extends Document{
    name:string;
    username:string;
    email:string;
    password:string;
    imageLogo:string;
    address:{
        address:string;
        street:string;
        pincode:number;
        state:string;
        city:string;
    }
    contact:string;
    isAdmin:boolean;
    cart:CartObj[];
    createdAt:Date;
    updatedAt:Date;
}

const UserSchema:Schema<User> = new Schema({
    name:{
        type:String,
        required:[true, "name is required"]
    },
    username:{
        type:String,
        required:[true, "username is required"],
        unique:true,
        trim:true
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
    imageLogo:{
        type:String,
        required:[true, "icon is required"]
    },
    address:{
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
    contact:{
        type:String,
    },
    isAdmin:{
        type:Boolean
    },
    cart:[
        {
            productId:{
                type:Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
})

UserSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('user')) return next();
    try{
        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    }catch(err:any){
        return next(err);
    }
})

UserSchema.methods.comparePassword = async function(candidatePassword:string):Promise<string|boolean>{
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err
    }
}


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);
export default UserModel;