'use server'
import dbConnect from "@/Db/Db"
import ProductModel from "@/models/Product";
import mongoose from "mongoose";

export const fetchProductsFromDB = async (offset: number) => {
    await dbConnect();
    try {
        const products = await ProductModel.aggregate([{ $sample: { size: offset } }]);
        if (!products) {
            return { success: false, message: 'No products found' };
        }
        // var arrayOfProducts:string[] =[]
        // products.forEach((element) =>{
        //     arrayOfProducts.push(element.name)
        // })
        const productsJsonString = JSON.stringify(products)
        return { products: productsJsonString, success: true, message: 'products fetched' };
    } catch (err) {
        return { message: 'some error occured', err, success: false }
    }
}

export const fetchOneProduct = async (productId: string) => {
    await dbConnect();
    try {
        // const product = await ProductModel.findById(productId);
        const product = await ProductModel.aggregate([
            { 
                $match: { _id: new mongoose.Types.ObjectId(productId) } 
            },
            { 
                // Use $project to ensure userReviews is an array, even if empty
                $project: {
                    name: 1,
                    description: 1,
                    specification: 1,
                    shippingCharge: 1,
                    quantity: 1,
                    images: 1,
                    price: 1,
                    priceAfterDiscount: 1,
                    discount: 1,
                    userReviews: { $ifNull: ['$userReviews', []] } // Ensure userReviews is always an array
                }
            },
            { 
                $unwind: {
                    path: '$userReviews',
                    preserveNullAndEmptyArrays: true // Keep the document even if userReviews is empty
                }
            },
            {
                $group: {
                    _id: new mongoose.Types.ObjectId(productId),
                    averageStar: { $avg: { $ifNull: ['$userReviews.star', 0] } }, // Handle missing stars
                    name: { $first: '$name' },
                    description: { $first: '$description' },
                    specification: { $first: '$specification' },
                    shippingCharge: { $first: '$shippingCharge' },
                    quantity: { $first: '$quantity' },
                    images: { $first: '$images' },
                    price: { $first: '$price' },
                    priceAfterDiscount: { $first: '$priceAfterDiscount' },
                    discount: { $first: '$discount' },
                    userReviews: { $push: '$userReviews' }
                }
            },
            {
                $project: {
                    name: 1,
                    description: 1,
                    specification: 1,
                    shippingCharge: 1,
                    quantity: 1,
                    images: 1,
                    price: 1,
                    priceAfterDiscount: 1,
                    discount: 1,
                    userReviews: {
                        $slice: ['$userReviews', 10] // Limit to the first 10 reviews
                    },
                    averageStar: 1
                }
            }
        ]);
        
        if (product) {
            const productsJsonString = JSON.stringify(product[0])
            // console.log(productsJsonString)
            return { message: "Product fetched", product: productsJsonString, success: true };
        } else {
            return { message: "unable to find any product of your store", success: false };
        }
    } catch (err) {
        return { message: "Some error occured", error: JSON.stringify(err), success: false };
    }
}

export const addReviewOfProduct = async (productId: string, payload: any) => {
    await dbConnect();
    try {
        const response = await ProductModel.findById(productId)
        if (!response) {
            return { message: 'Cannot add review', success: false }
        }
        response.userReviews.push(payload)
        await response.save()
        return { message: 'Review added', success: true }
    } catch (err) {
        return { message: 'Some error occured', error: JSON.stringify(err), success: false }
    }
}

export const showReviewOfProduct = async (productId: string, userEmail: string) => {
    await dbConnect();
    try {
        const product = await ProductModel.findById(productId);
        if (!product) {
            return { message: 'Product not found', success: false }
        }
        const filteredReview = product.userReviews.filter(review => review.userEmail === userEmail)
        // console.log(filteredReview)
        if (filteredReview.length===0) {
            return { message: 'No review found', success: false }
        }
        const reviewJsonString = JSON.stringify(filteredReview[0])
        // console.log(reviewJsonString)
        return { message: 'fetched the review', success: true, review: reviewJsonString }
    } catch (err) {
        return { message: 'Some error occured', error: JSON.stringify(err), success: false }
    }
}

export const deleteReviewOfProduct = async (productId:string, userEmailToDelete:string) =>{
    await dbConnect();
    try{
       const deleteReview =  await ProductModel.updateOne(
            { _id: productId },
            { $pull: { userReviews: { userEmail: userEmailToDelete } } }
          );
        if(!deleteReview){
            return { message: 'No review found', success: false }
        }
        return { message: 'Review Deleted', success: true }
    } catch (err) {
        return { message: 'Some error occured', error: JSON.stringify(err), success: false }
    }
}

export const searchProducts = async (query:string) => {
    await dbConnect();
    try{
        const product = await ProductModel.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { specification: { $regex: query, $options: 'i' } },
                { 'category.parentCategory.name': { $regex: query, $options: 'i' } },
                { 'category.subCategory.name': { $regex: query, $options: 'i' } },
            ],
        }).limit(5);
        // console.log(product)
        if (product) {
            const productsJsonString = JSON.stringify(product)
            // console.log(productsJsonString)
            return { message: "Product fetched", product: productsJsonString, success: true };
        } else {
            return { message: "unable to find any product of your store", success: false };
        }
    } catch (err) {
        return { message: 'Some error occured', error: JSON.stringify(err), success: false }
    }
}

export const fetchProductsForHome = async (categoryName:string) => {
    await dbConnect();
    try{
        const products = await ProductModel.find({'category.parentCategory.name':categoryName}, {userReviews:0}).limit(4);
        if(products.length > 0){
            const productsJsonString = JSON.stringify(products)
            // console.log(productsJsonString)
            return { message: "Product fetched", product: productsJsonString, success: true };
        } else {
            return { message: "unable to find any product of your store", success: false };
        }
    } catch (err) {
        return { message: 'Some error occured', error: JSON.stringify(err), success: false }
    }
}