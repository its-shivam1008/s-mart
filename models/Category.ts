import mongoose, {Schema, Types, Document} from "mongoose";

interface Category extends Document {
    name:string;
    description:string;
    createdAt:Date;
    updatedAt:Date;
}

const CategorySchema:Schema<Category>=new Schema({
    name:{
        type:String,
        reqired:[true, "Category name is required"]
    },
    description:{
        type:String,
        reqired:[true, "description is required"]
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

const CategoryModel = (mongoose.models.Category as mongoose.Model<Category>) || mongoose.model<Category>("Category", CategorySchema);

export default CategoryModel;