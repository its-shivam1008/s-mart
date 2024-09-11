'use server'

import dbConnect from "@/Db/Db"
import ParentCategoryModel from "@/models/ParentCategory";
import StoreModel from "@/models/Store";

export const productSubCategory =  async(email:string) =>{
    await dbConnect();
    try{
        // console.log(email)
        const store = await StoreModel.findOne({'associatedUser.userEmail':email})
        // console.log(store)
        if(store){
            // console.log(store)
            const category = await ParentCategoryModel.findById(store.category.categoryId)
            
            if(category){
                var arrayOfSubCategoryNames:string[] =[]
                category.subCategory.forEach((element) =>{
                    arrayOfSubCategoryNames.push(element.name)
                })
                return { message : "Got the sub categories", success:true, parentCat:category.name,subCat:arrayOfSubCategoryNames}
            }
        }else{
            return { message : 'Store not found', success:false}
        }
    }catch(err){
        return {message:'some error occured', error:JSON.stringify(err)}
    }
}