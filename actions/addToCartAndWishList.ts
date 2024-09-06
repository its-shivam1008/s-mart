'use server';

import dbConnect from "@/Db/Db";
import UserModel, { CartObj } from "@/models/User";
import { Types } from "mongoose";

export const addItemToWishList = async (userEmail: string, productId: any) => {
    await dbConnect()
    try {
        const user = await UserModel.findOne({ email: userEmail })
        if (!user) {
            return { message: 'user not found', success: false }
        }
        if (!user.wishlist.includes(productId)) {
            user.wishlist.push(productId)
            await user.save()
            return { message: 'item added to wishlist', success: true }
        }
        return { message: 'item is already present', success: false }
    } catch (err) {
        return { message: 'Some error occured', error: err, success: false }
    }
}

export const removeItemFromWishList = async (userEmail: string, productId: any) => {
    await dbConnect()
    try {
        const user = await UserModel.findOne({ email: userEmail })
        if (!user) {
            return { message: 'user not found', success: false }
        }
        const index = user.wishlist.indexOf(productId);
        if (index > -1) {
            const updatedUser = await UserModel.findOneAndUpdate({ email: userEmail }, { $pull: { wishlist: productId } })
            // await user.save()
            return { message: 'item removed from the wishlist', success: true }
        }
        return { message: 'Item is not present in the wishlist, that is to be removed', success: false }
    } catch (err) {
        return { message: 'Some error occured', error: err, success: false }
    }
}

export const getItemFromWishList = async (userEmail: string) => {
    await dbConnect()
    try {
        const user = await UserModel.findOne({ email: userEmail })
        if (!user) {
            return { message: 'user not found', success: false }
        }
        if (!user.wishlist.length) {
            return { message: 'wishlist is empty', wishlist: [], success: false }
        }
        const wishlistJsonString = JSON.stringify(user.wishlist)
        return { message: 'wishlist found', wishlist: wishlistJsonString, success: true }
    } catch (err) {
        return { message: 'Some error occured', error: err, success: false }
    }
}

export const addItemToCart = async (userEmail: string, productId: any, price: number) => {
    await dbConnect()
    try {
        const user = await UserModel.findOne({ email: userEmail })
        if (!user) {
            return { message: 'user not found', success: false }
        }
        const productExists = user.cart.some(p => p.productId === productId)
        if (!productExists) {
            user.cart.push({ productId: productId as Types.ObjectId, price, quantity: 1 })
            await user.save()
            return { message: 'item added to cart', success: true }
        }
        return { message: 'item is already present', success: false }
    } catch (err) {
        return { message: 'Some error occured', error: err, success: false }
    }
}

export const removeItemFromCart = async (userEmail: string, productId: any) => {
    await dbConnect()
    try {
        const user = await UserModel.findOne({ email: userEmail })
        if (!user) {
            return { message: 'user not found', success: false }
        }
        const productExists = user.cart.some(p => p.productId === productId)
        if (productExists) {
            const updatedUser = await UserModel.findOneAndUpdate({ email: userEmail }, { $pull: { cart: { productId: productId } } })
            // await user.save()
            return { message: 'item removed from the cart', success: true }
        }
        return { message: 'Item is not present in the cart, that is to be removed', success: false }
    } catch (err) {
        return { message: 'Some error occured', error: err, success: false }
    }
}

export const getItemFromCart = async (userEmail: string) => {
    await dbConnect()
    try {
        const user = await UserModel.findOne({ email: userEmail })
        if (!user) {
            return { message: 'user not found', success: false }
        }
        if (!user.cart.length) {
            return { message: 'Cart is empty', cart: [], success: false }
        }
        const cartJsonString = JSON.stringify(user.cart)
        return { message: 'cart found', cart: cartJsonString, success: true }
    } catch (err) {
        return { message: 'Some error occured', error: err, success: false }
    }
}

export const updateItemsOfCart = async (userEmail: string, payload: CartObj) => {
    await dbConnect()
    try {
        const user = await UserModel.findOne({ email: userEmail })
        if (!user) {
            return { message: 'user not found', success: false }
        }
        const productExists = user.cart.some(p => p.productId === payload.productId)
        if (productExists) {
            const updatedUser = await UserModel.findOneAndUpdate({ email: userEmail, 'cart.productId': payload.productId },
                {
                    $set: {
                        'cart.$.price': (payload.price * payload.quantity),
                        'cart.$.quantity': payload.quantity
                    },
                },
                {new:true}
            )
            // await user.save()
            if(!updatedUser){
                return { message: 'Cannot update items price and quanntity', success: false }
            }
            return { message: 'item price and quantity of cart updated', success: true }
        }
        return { message: 'Product not found in the cart', success: false }
    } catch (err) {
        return { message: 'Some error occured', error: err, success: false }
    }
}
