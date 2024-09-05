'use client'
import { Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { FunctionComponent, useEffect, useState } from 'react'

interface CardInfo {
    cardInfo: any
}

const ProductCards: FunctionComponent<CardInfo> = ({ cardInfo }) => {
    const { name, images, price, description, _id } = cardInfo
    // console.log(images[0].split('//').join())
    const [isAddCart, setIsAddCart] = useState(false)
    const [isHandleLike, setIsHandleLike] = useState(false)
    const [isPresentInWishListAlready, setIsPresentInWishListAlready] = useState(false)


    function saveWishlist(wishlist: string[]) {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
    function getWishlist() {
        const wishlist = localStorage.getItem('wishlist');
        return wishlist ? JSON.parse(wishlist) : [];
    }
    function addToWishlist(item: string) {
        let wishlist = getWishlist();
        if (!wishlist.includes(item)) {
            wishlist.push(item);
            saveWishlist(wishlist);
            console.log(item + ' added to wishlist!');
        } else {
            console.log(item + ' is already in the wishlist.');
        }
    }
    function removeFromWishlist(item: string) {
        let wishlist = getWishlist();
        const index = wishlist.indexOf(item);
        if (index > -1) {
            wishlist.splice(index, 1);
            saveWishlist(wishlist);
            console.log(item + ' removed from wishlist!');
        } else {
            console.log(item + ' was not found in the wishlist.');
        }
    }
    function clearWishlist() {
        localStorage.removeItem('wishlist');
        console.log('Wishlist cleared!');
    }

    // clearWishlist()

    const handleLike = (productId: string, newHandleLike:boolean) => {

        if (newHandleLike) {
            addToWishlist(productId);
        } else {
            removeFromWishlist(productId)
        }
        console.log(getWishlist());
    }

    useEffect(() => {
      const wishlist = getWishlist()
      for(let a of wishlist){
        if(a === _id){
            setIsHandleLike(true);
        }
      }
      const cart = getCart()
      for(let b of cart){
        if(b === _id){
            setIsAddCart(true);
        }
      }
    }, [])

    const handleClearWishList = () => {
        clearWishlist();
    }

    function saveCart(cart: string[]) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    function getCart() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }
    function addToCart(item: string) {
        let cart = getCart();
        if (!cart.includes(item)) {
            cart.push(item);
            saveCart(cart);
            console.log(item + ' added to cart!');
        } else {
            console.log(item + ' is already in the cart.');
        }
    }
    function removeFromCart(item: string) {
        let cart = getCart();
        const index = cart.indexOf(item);
        if (index > -1) {
            cart.splice(index, 1);
            saveCart(cart);
            console.log(item + ' removed from cart!');
        } else {
            console.log(item + ' was not found in the cart.');
        }
    }
    function clearCart() {
        localStorage.removeItem('cart');
        console.log('cart cleared!');
    }

    const handleAddToCart = (productId: string, newHandleCart:boolean)  => {
        if (newHandleCart) {
            addToCart(productId);
        } else {
            removeFromCart(productId)
        }
        console.log(getCart());
    }
    
    

    return (
        <div className="relative eleProd my-5 w-48 h-fit p-4 rounded-[12px] flex flex-col gap-2 justify-center shadow-lg outline outline-offset-4 outline-transparent hover:outline-[rebeccapurple] transition-all duration-500 mx-auto hover:scale-105 hover:shadow-2xl hover:shadow-[rebeccapurple] cursor-pointer">
            <div title='Add to wishlist' className='absolute top-3 -right-1 ml-2 mb-2 p-2'>
                <Heart onClick={() => {
                    setIsHandleLike(prevIsHandleLike => {
                        const newIsHandleLike = !prevIsHandleLike;
                        handleLike(_id, newIsHandleLike);
                        return newIsHandleLike;
                    });
                }} className='size-5' fill={`${isHandleLike? '#ff0033' : 'transparent'}`} />
            </div>
            <Link href={`/products/${_id}`} className='w-fit h-fit'>
                <div className="title text-lg font-semibold">{name.length > 15 ? `${name.substring(0, 13)}...` : name}</div>
                <div className='mx-auto w-36 h-36 rounded-[8px]'>
                    <Image src={images[0]} alt="noimg" className='rounded-[8px] transition-transform hover:scale-110 duration-500' width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="price text-xl font-bold">{price}</div>
                <div className="description text-sm">{description.length > 20 ? `${description.substring(0, 30)}...` : description}</div>
            </Link>
            <button onClick={() => {
                    setIsAddCart(prevIsCart => {
                        const newIsCart = !prevIsCart;
                        handleAddToCart(_id, newIsCart);
                        return newIsCart;
                    });
                }} title='Add to cart' type="button" className='rounded-[8px] flex items-center px-full py-2 gap-2 hover:text-black hover:bg-[#f2f2f2] transition-colors duration-300 border-2 hover:border-black bg-black font-bold text-white'>{!isAddCart ? <div className='flex items-center gap-2 mx-auto'><ShoppingCart /><div>Add to cart</div></div> : <div className='mx-auto'>Remove item</div>}</button>
        </div>
    )
}

export default ProductCards