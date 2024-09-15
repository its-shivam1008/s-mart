import dbConnect from "@/Db/Db";
import SubCategoryModel from "@/models/SubCategory";
import ParentCategoryModel from "@/models/ParentCategory";
import UserModel from "@/models/User";
import ParentCategory from "@/models/ParentCategory"
import { NextResponse } from "next/server";
import { SubCategoryArray } from "@/models/ParentCategory";

export async function POST(req:Request){
    await dbConnect();
    try{
        const data = await req.json()
        // checking in the db that the user is admin or not , session is provided as a body to the request
        //TODO: 

        const {searchParams} = new URL(req.url)
        const queryParam = {
            subCategory:searchParams.get('subCategory'),
            parentCategory:searchParams.get('parentCategory')
        }
        if(queryParam.parentCategory){

            // // for bulk data insertion
            // const arrayOfData = data.payload
            // // console.log(arrayOfData)
            // const savedData = await ParentCategoryModel.create(arrayOfData)
            // // console.log(savedData)

            // for single data insertion
            const savedData = new ParentCategoryModel(data.payload)
            await savedData.save();
    
            return NextResponse.json({message:"Saved parent categories", success:true}, {status:200})
        }else if(queryParam.subCategory){
            // for bulk data insertion

            // const arrayOfData = data.payload
            // // console.log(arrayOfData)
            // console.log(arrayOfData.length)
            // const savedData = await SubCategoryModel.create(arrayOfData)
            // // console.log(savedData)
            // for(let a of arrayOfData){
            //     const subCat = await SubCategoryModel.findOne({name:a.name})
            //     // console.log(subCat)
            //     const SubCategory:SubCategoryArray = {
            //         name:subCat?.name,
            //         description:subCat?.description,
            //         properties:subCat?.properties,
            //         subCategoryId:subCat?._id
            //     } as SubCategoryArray
            //     // console.log(SubCategory)
            //     const parentCat = await ParentCategoryModel.findOne({name:a.parentCategory.parentName});
            //     // console.log(parentCat)
            //     parentCat?.subCategory.push(SubCategory)
            //     await parentCat?.save();
            // }


            //for single data insertion

            const savedData = new SubCategoryModel(data.payload)
            await savedData.save();
            const subCat = await SubCategoryModel.findOne({name:data.payload.name})
            if(!subCat){
                return NextResponse.json({message:"sub Category not found to be pushed to parent category", success:false}, {status:400})
            }
            const SubCategory:SubCategoryArray = {
                name:subCat.name,
                description:subCat.description,
                properties:subCat.properties,
                subCategoryId:subCat._id
            } as SubCategoryArray
            const parentCat = await ParentCategoryModel.findOne({name:data.payload.parentCategory.parentName});
            if(!parentCat){
                return NextResponse.json({message:"parent Category not found", success:false}, {status:400})
            }
            // console.log(parentCat)
            parentCat.subCategory.push(SubCategory)
            await parentCat.save();
    
            return NextResponse.json({message:"Saved all sub categories", success:true}, {status:200})
        }
    }catch(err){
        return NextResponse.json({message:"Internal server error", success:false}, {status:500})
    }
}