'use server'
import dbConnect from "@/Db/Db"
import ProductModel from "@/models/Product";

export const fetchProductsFromDB = async (offset:number) =>{
    await dbConnect();
    try{
        const products = await ProductModel.aggregate([{ $sample: { size: offset } }]);
        if(!products){
            return {success:false, message:'No products found'};
        }
        // var arrayOfProducts:string[] =[]
        // products.forEach((element) =>{
        //     arrayOfProducts.push(element.name)
        // })
        const productsJsonString = JSON.stringify(products)
        return {products:productsJsonString, success:true, message:'products fetched'};
    }catch(err){
        return {message: 'some error occured', err, success:false}
    }
}