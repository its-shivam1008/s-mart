import mongoose, {Schema, Types, Document} from "mongoose";

interface SubCategoryArray{
    name:string;
    description:string;
    properties:[];
    subCategoryId:Types.ObjectId;
}

interface ParentCategory extends Document {
    name:string;
    description:string;
    subCategory:SubCategoryArray[];
    createdAt:Date;
    updatedAt:Date;
}

const ParentCategorySchema:Schema<ParentCategory>=new Schema({
    name:{
        type:String,
        unique:true,
        reqired:[true, "Category name is required"]
    },
    description:{
        type:String,
        reqired:[true, "description is required"]
    }, 
    subCategory:[
        {
            name:String,
            description:String,
            properties:[],
            subCategoryId:{
                type:Schema.Types.ObjectId,
                ref:'SubCategory'
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

const ParentCategoryModel = (mongoose.models.ParentCategory as mongoose.Model<ParentCategory>) || mongoose.model<ParentCategory>("ParentCategory", ParentCategorySchema);

interface SubCategory extends Document{
    name:string;
    description:string;
    properties:[];
    parentCategoryId:Types.ObjectId;
    createdAt:Date;
    updatedAt:Date;
}

const SubCategorySchema:Schema<SubCategory> = new Schema({
    name:{
        type:String,
        unique:true,
        reqired:[true, "SubCategory name is required"]
    },
    description:{
        type:String,
        reqired:[true, "SubCategory description is required"]
    }, 
    properties:[],
    parentCategoryId:{
        type:Schema.Types.ObjectId,
        ref:'ParentCategory'
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

const SubCategoryModel = (mongoose.models.SubCategory as mongoose.Model<SubCategory>) || mongoose.model<SubCategory>('SubCategory', SubCategorySchema)

export default {SubCategoryModel, ParentCategoryModel};