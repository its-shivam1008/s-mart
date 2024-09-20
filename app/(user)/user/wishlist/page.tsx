'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, {useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { addItemToCart, getCartItemsFromProduct, getItemFromWishList, getWishlistFromProduct, removeItemFromCart, removeItemFromWishList, updateItemsOfCart } from '@/actions/addToCartAndWishList';
import { useToast } from '@/components/ui/use-toast';

const page = () => {

    const { data: session, status } = useSession()
    
    const [flag, setFlag] = useState(false)
    const [flag2, setFlag2] = useState(false)
    const [wishlistArray, setWishlistArray] = useState([{ name: '', _id: '', images: [''], priceAfterDiscount: 0, quantity: 0 }])
    const { toast } = useToast()


    const fetchProductsFromWishList = async (userEmail: string) => {
        const wishListItems = await getItemFromWishList(userEmail)
        console.log('wisdhlist res',wishListItems)
        if (wishListItems.success) {
            const wishlistObject = JSON.parse(wishListItems.wishlist as string)
            // const productIds = wishlistObject.map((obj: any) => obj.productId)
            const arrayOfProds: any = await getWishlistFromProduct(wishListItems.wishlist)
            if (arrayOfProds.success) {
                const products = JSON.parse(arrayOfProds?.products as string)
                // for (let a of products) {
                //     for (let b of wishlistObject) {
                //         if (a._id == b.productId) {
                //             a.quantity = b.quantity
                //             // a.price = b.price
                //         }
                //     }
                // }
                console.log('this is product',products)
                setWishlistArray(products)
            }else{
                console.log(arrayOfProds.message)
            }
        }
    }
    useEffect(() => {
        if (session && !flag) {
            console.log(session);
            fetchProductsFromWishList(session.user.email as string)
            setFlag(true)
        }
    }, [session, flag, wishlistArray])

    const handleRemoveFromWishlist = async (elementId:any) => {
        const res = await removeItemFromWishList(session?.user.email as string, elementId)
        if(res?.success){
            toast({
                title:'Item removed from wishlist'
            })
            fetchProductsFromWishList(session?.user.email as string)
        }else{
            toast({
                variant:'destructive',
                title:'Some error occured'
            })
        }
        
    }

    const handleAddToCart = async (elementId:any, price:number) => {
        const res = await addItemToCart(session?.user.email as string, elementId as any, price)
        if(res?.success){
            handleRemoveFromWishlist(elementId)
            fetchProductsFromWishList(session?.user.email as string)
            toast({
                title:'Added to cart'
            })
        }else{
            toast({
                variant:'destructive',
                title:'Some error occured'
            })
        }
        
    }


    // <div>lol</div>
    return (
        <div className='wishListItems min-h-screen bg-[#f2f2f2] flex justify-center items-center'>
            {
                wishlistArray.length === 0 || wishlistArray[0].images[0] === '' ? <div className='text-xl text-center font-bold min-h-screen'>No products found in your cart</div> : <div className="bg-[#f2f2f2] w-[90%] my-16 p-4 rounded-[12px] space-y-5">
                    <div>
                        {
                            wishlistArray.map((element:any, index:number) => {
                                return (
                                    <div key={index} className='flex flex-col gap-1 p-2'>
                                        <div className="font-bold text-md m-2">{element.name}</div>
                                        <div className="flex items-center justify-between">
                                            <div className='image w-30 h-20 shadow-md rounded-[12px]'>
                                                <Image className="rounded-[12px]" src={element.images[0]} alt='noImg found' width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                                <div className="flex gap-2 items-center">
                                                    <button type="button" onClick={() => handleRemoveFromWishlist(element._id)} className='px-2 py-1 text-md font-bold rounded-[8px] text-white bg-black'>Remove</button>
                                                    <button type="button" onClick={() => handleAddToCart(element._id, element.priceAfterDiscount)} className='px-2 py-1 text-md font-bold rounded-[8px] text-white bg-green-700'>Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default page