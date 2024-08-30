
import Image from 'next/image'
import React, { FunctionComponent } from 'react'

interface CardInfo {
    cardInfo: any
}

const ProductCards:FunctionComponent<CardInfo> = ({cardInfo}) => {
    const { name , images, price, description } = cardInfo
    // console.log(images[0].split('//').join())
    return (
        <div className="eleProd mt-10 w-48 h-fit p-4 m-2 rounded-[12px] flex flex-col gap-3 justify-center shadow-2xl outline outline-offset-4 outline-transparent hover:outline-[rebeccapurple] transition-colors duration-700 mx-auto">
            <div className="title text-lg font-semibold">{name.length > 15 ? `${name.substring(0,13)}...`:name}</div>
            <div className='mx-auto w-36 h-36 rounded-[8px]'>
            <Image src={images[0]} alt="noimg" className='rounded-[8px]'  width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%', objectFit:'cover'}}/>
            </div>
            <div className="price text-xl font-bold">{price}</div>
            <div className="description text-sm">{description.length > 20 ? `${description.substring(0,30)}...`:description}</div>
        </div>
    )
}

export default ProductCards