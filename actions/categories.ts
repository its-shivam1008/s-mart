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
        return { message: 'Some error occured', error: JSON.stringify(err), success: false }
    }
}

export const fetchCategoryProduct = async (categoryName:string) => {
    await dbConnect()
    try{
        const products = await ProductModel.find({'category.parentCategory.name':categoryName}).limit(4)
        // console.log("le pothe ki",products)
        if(products.length > 0){
            const stringArray = JSON.stringify(products)
            // console.log('producst string', stringArray)
            return { message: 'Products found', categoryProducts: stringArray, success:true }  
        }
    } catch (err) {
        return { message: 'Some error occured', error: JSON.stringify(err), success: false }
    }
}

export const fetchAllCategoryProduct = async (categoryName:string) => {
    await dbConnect()
    try{
        const products = await ProductModel.find({'category.parentCategory.name':categoryName})
        // console.log("le pothe ki",products)
        if(products.length > 0){
            const stringArray = JSON.stringify(products)
            // console.log('producst string', stringArray)
            return { message: 'Products found', categoryProducts: stringArray, success:true }  
        }else{
            return {message:'Nothing found', success:false}
        }
    } catch (err) {
        return { message: 'Some error occured', error: JSON.stringify(err), success: false }
    }
}

export const fetchCategory = async (categoryName:string) => {
    await dbConnect()
    // console.log('ho gya connect')
    try{
        const categories = await ParentCategoryModel.findOne({name:categoryName})
        // console.log('lol connect', categories)
        // const ArrayCategoryNames = []
        // for(let a of categories){
        //     ArrayCategoryNames.push({name:a.name, id:a._id});
        // }
        if(categories){
            const stringArray = JSON.stringify(categories)
            return { message: 'Found category', categoriesObj: stringArray, success: true }  
        }else{
            return {message:'Nothing found', success:false}
        }
    } catch (err) {
        return { message: 'Some error occured', error: JSON.stringify(err), success: false }
    }
}

export const filterProducts = async (sortBy: 'priceAfterDiscount' | 'name', order: 'asc' | 'desc', subCategory?: string, properties?: { [key: string]: any }) => {
    await dbConnect();
    
    try {
        // Determining sort order
        const sortOrder = order === 'desc' ? -1 : 1;

        // Building the query object
        const query: any = {};
        
        if (subCategory) {
            query['category.subCategory.name'] = subCategory;
        }
        
        if (properties) {
            for (const [key, value] of Object.entries(properties)) {
                // we let properties is an array of values or a single value
                if (Array.isArray(value)) {
                    // Using $in to match any of the values
                    query[`category.subCategory.properties.${key}`] = { $in: value };
                } else {
                    // Matching the exact value
                    query[`category.subCategory.properties.${key}`] = value;
                }
            }
        }

        // Executing the query with sorting
        const products = await ProductModel.find(query).sort({ [sortBy]: sortOrder });

        if (products.length > 0) {
            // Converting products to JSON string for response
            const stringArray = JSON.stringify(products);
            return { message: 'Products found', categoryProducts: stringArray, success: true };
        } else {
            return { message: 'Nothing found', success: false };
        }
    } catch (err) {
        return { message: 'Some error occurred', error: JSON.stringify(err), success: false };
    }
};