import mongoose, {Schema, Types, Document} from "mongoose";

interface SubCategory extends Document{
    name:string;
    description:string;
    properties:[];
    parentCategory:{
        parentId:Types.ObjectId;
        parentName:string;
    };
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
    parentCategory:{
        parentId:{
            type:Schema.Types.ObjectId,
            ref:'ParentCategory'
        },
        parentName:String
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

export default SubCategoryModel;
