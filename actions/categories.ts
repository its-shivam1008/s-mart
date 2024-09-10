'use server'
import dbConnect from "@/Db/Db"
import ParentCategoryModel from "@/models/ParentCategory"

export const fetchCategories = async () => {
    await dbConnect()
    // console.log('ho gya connect')
    try{
        const categories = await ParentCategoryModel.find({})
        // console.log('lol connect', categories)
        const ArrayCategoryNames = []
        for(let a of categories){
            ArrayCategoryNames.push({name:a.name, id:a._id});
        }
        if(ArrayCategoryNames.length > 0){
            const stringArray = JSON.stringify(ArrayCategoryNames)
            return { message: 'Some error occured', categoriesArray: stringArray, success: true }  
        }
    } catch (err) {
        return { message: 'Some error occured', error: err, success: false }
    }
}

export const fetchCategoryProduct = async (categoryName:string) => {
    await dbConnect()
    try{
        const categories = await ParentCategoryModel.find()
        const ArrayCategoryNames = []
        for(let a of categories){
            ArrayCategoryNames.push(a.name);
        }
        if(ArrayCategoryNames.length > 0){
            const stringArray = JSON.stringify(ArrayCategoryNames)
            return { message: 'Some error occured', categoriesArray: stringArray, success: false }  
        }
    } catch (err) {
        return { message: 'Some error occured', error: err, success: false }
    }
}