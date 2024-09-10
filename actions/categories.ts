'use server'
import dbConnect from "@/Db/Db"
import ParentCategoryModel from "@/models/ParentCategory"
import ProductModel from "@/models/Product"

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
        const products = await ProductModel.find({'category.parentCategory.name':categoryName}).limit(4)
        console.log(products)
        if(products.length > 0){
            const stringArray = JSON.stringify(products)
            console.log('producst string', stringArray)
            return { message: 'Some error occured', categoryProducts: stringArray, success: false }  
        }
    } catch (err) {
        return { message: 'Some error occured', error: err, success: false }
    }
}