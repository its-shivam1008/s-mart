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

export const fetchOneProduct = async (productId:string) => {
    await dbConnect();
    try{
        const product = await ProductModel.findById(productId);
        if (product) {
            const productsJsonString = JSON.stringify(product)
            return {message:"Product fetched", product:productsJsonString, success:true};
        }else{
            return {message:"unable to find any product of your store", success:false};
        }
    }catch(err){
        return {message:"Some error occured", error:err, success:false};
    }
}