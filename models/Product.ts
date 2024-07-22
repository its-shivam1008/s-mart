import mongoose, {Schema, Document} from "mongoose";

interface Reviews {
    userId:string;
    review:string;
    ratings:number;
}

interface Product extends Document{
    name:string;
    description:string;
    specification:string;
    quantity:string;
    categoryId:string;
    price:number;
    discount:number;
    shippingCharge:number;
    userReviews:Reviews[];
    images:string[];
    createdAt:Date;
    updatedAt:Date;
}

const ProductSchema:Schema<Product> = new Schema({
    
})