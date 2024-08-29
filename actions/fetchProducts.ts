import dbConnect from "@/Db/Db"
import ProductModel from "@/models/Product";

export const fetchProducts = async (offset:number) =>{
    await dbConnect();
    try{
        const products = await ProductModel.aggregate([{ $sample: { size: offset } }]);
        return {products, success:true, message:'products fetched'};
    }catch(err){
        return {message: 'some error occured', err}
    }
}