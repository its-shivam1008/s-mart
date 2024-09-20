'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, {useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { getCartItemsFromProduct, getItemFromCart, removeItemFromCart, updateItemsOfCart } from '@/actions/addToCartAndWishList';
import { useToast } from '@/components/ui/use-toast';

const page = () => {

    const { data: session, status } = useSession()
    
    const [flag, setFlag] = useState(false)
    const [flag2, setFlag2] = useState(false)
    const [cartItemsArray, setCartItemsArray] = useState([{ name: '', _id: '', images: [''], priceAfterDiscount: 0, quantity: 0 }])
    const { toast } = useToast()


    const fetchProductsFromCart = async (userEmail: string) => {
        const cartItems = await getItemFromCart(userEmail)
        if (cartItems.success) {
            const cartObject = JSON.parse(cartItems.cart as string)
            const productIds = cartObject.map((obj: any) => obj.productId)
            const arrayOfProds: any = await getCartItemsFromProduct(JSON.stringify(productIds))
            if (arrayOfProds.success) {
                const products = JSON.parse(arrayOfProds?.products as string)
                for (let a of products) {
                    for (let b of cartObject) {
                        if (a._id == b.productId) {
                            a.quantity = b.quantity
                            // a.price = b.price
                        }
                    }
                }
                setCartItemsArray(products)
            }
        }
    }
    useEffect(() => {
        if (session && !flag) {
            console.log(session);
            fetchProductsFromCart(session.user.email as string)
            setFlag(true)
        }
    }, [session, flag, cartItemsArray])

    const handleAddOneProduct = async (productId: any, price: number, quantity: number) => {

        const payload = {
            productId, price, quantity: quantity + 1
        }
        await updateItemsOfCart(session?.user.email as string, payload)
        fetchProductsFromCart(session?.user.email as string)
    }
    const handleRemoveOneProduct = async (productId: any, price: number, quantity: number) => {
        if (quantity > 1) {
            const payload = {
                productId, price, quantity: quantity - 1
            }
            await updateItemsOfCart(session?.user.email as string, payload)
            fetchProductsFromCart(session?.user.email as string)
        } else {
            await removeItemFromCart(session?.user.email as string, productId)
            fetchProductsFromCart(session?.user.email as string)
        }
    }

    return (
        <div className='cartItems bg-[#f2f2f2]  min-h-screen flex justify-center items-center'>
            {
                cartItemsArray.length === 0 || cartItemsArray[0].images[0] === '' ? <div className='text-xl text-center font-bold'>No products found in your cart</div> : <div className="bg-[#f2f2f2] w-[90%] my-16 p-4 rounded-[12px] space-y-5">
                    <div>
                        {
                            cartItemsArray.map((element, index) => {
                                return (
                                    <div key={index} className='flex flex-col gap-1 p-2'>
                                        <div className="font-bold text-md m-2">{element.name}</div>
                                        <div className="flex items-center justify-between">
                                            <div className='image w-30 h-20 shadow-md rounded-[12px]'>
                                                <Image className="rounded-[12px]" src={element.images[0]} alt='noImg found' width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <div className="flex flex-col gap-2 justify-center items-center ml-3">
                                                <div className="flex gap-2 items-center">
                                                    <button type="button" onClick={() => handleAddOneProduct(element._id, element.priceAfterDiscount, element.quantity)} className='px-5 py-3 text-xl font-bold rounded-full text-white bg-black'>+</button>
                                                    <div className="font-bold">{element.quantity}</div>
                                                    <button type="button" onClick={() => handleRemoveOneProduct(element._id, element.priceAfterDiscount, element.quantity)} className='px-[21.5px] py-3 text-xl font-bold rounded-full text-white bg-black'>-</button>
                                                </div>
                                                <div className="font-bold">₹ {element.priceAfterDiscount * element.quantity}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <hr />
                    <div className="flex flex-col gap-3">
                        <div className='flex flex-col gap-2'>
                            {
                                cartItemsArray.map((element, indx) => {
                                    return (
                                        <div key={indx} className='flex justify-between '>
                                            <div className='font-bold text-md'>{element.name.length > 15 ? `${element.name.substring(0, 13)}...` : element.name} :</div>
                                            <div className='font-bold text-md'>₹ {element.quantity * element.priceAfterDiscount}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="flex justify-between">
                            <div className="text-xl font-bold">Total :</div>
                            <div className="text-xl font-bold">
                                {
                                    cartItemsArray.reduce((addedPrice, currentItem) => {
                                        // setAmount(addedPrice + (currentItem.priceAfterDiscount * currentItem.quantity))
                                        return addedPrice + (currentItem.priceAfterDiscount * currentItem.quantity)
                                    }, 0)
                                }
                            </div>
                        </div>
                        <Link href='/checkout' className="flex items-center p-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 w-fit mx-auto">
                            <span className="ml-2 text-sm font-medium mr-2">Checkout</span>
                        </Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default page