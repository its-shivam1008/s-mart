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
            { $match: { _id: new mongoose.Types.ObjectId(productId) } },
            { $unwind: '$userReviews' },
            {
                $group: {
                    _id: new mongoose.Types.ObjectId(productId),
                    averageStar: { $avg: '$userReviews.star' },
                    name: { $first: '$name' },
                    description: { $first: '$description' },
                    specification: { $first: '$specification' },
                    shippingCharge: { $first: '$shippingCharge' },
                    quantity: { $first: '$quantity' },
                    images: { $first: '$images' },
                    price: { $first: '$price' },
                    priceAfterDiscount: { $first: '$priceAfterDiscount' },
                    discount: { $first: '$discount' },
                    userReviews: { $push: '$userReviews' },
                    // averageStar: { $avg: '$userReviews.star' } // Calculate the average star rating
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
                        $slice: ['$userReviews', 10]
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