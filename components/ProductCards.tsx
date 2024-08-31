
import Image from 'next/image'
import Link from 'next/link'
import React, { FunctionComponent } from 'react'

interface CardInfo {
    cardInfo: any
}

const ProductCards: FunctionComponent<CardInfo> = ({ cardInfo }) => {
    const { name, images, price, description, _id } = cardInfo
    // console.log(images[0].split('//').join())
    return (
        <Link href={`/products/${_id}`}>
            <div className="eleProd my-5 w-48 h-fit p-4 rounded-[12px] flex flex-col gap-2 justify-center shadow-lg outline outline-offset-4 outline-transparent hover:outline-[rebeccapurple] transition-all duration-500 mx-auto hover:scale-105 hover:shadow-2xl hover:shadow-[rebeccapurple] cursor-pointer">
                <div className="title text-lg font-semibold">{name.length > 15 ? `${name.substring(0, 13)}...` : name}</div>
                <div className='mx-auto w-36 h-36 rounded-[8px]'>
                    <Image src={images[0]} alt="noimg" className='rounded-[8px] transition-transform hover:scale-110 duration-500' width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="price text-xl font-bold">{price}</div>
                <div className="description text-sm">{description.length > 20 ? `${description.substring(0, 30)}...` : description}</div>
            </div>
        </Link>
    )
}

export default ProductCards