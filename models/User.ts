import mongoose, {Schema, Document} from "mongoose";

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
    imageeLogo:string;
    address:{
        address:string;
        street:string;
        pincode:number;
        state:string;
        country:string;
    }
    constact:string;
    isAdmin:boolean;
    cart:CartObj[];
    createdAt:Date;
    updatedAt:Date;
}

