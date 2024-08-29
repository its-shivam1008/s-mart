
import Image from 'next/image'
import React, { FunctionComponent } from 'react'

interface CardInfo {
    cardInfo: any
}

const ProductCards:FunctionComponent<CardInfo> = ({cardInfo}) => {
    const { name , images, price, description } = cardInfo
    console.log(images[0].split('//').join())
    return (
        <div className="eleProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
            <div className="title text-xl font-semibold">{name}</div>
            <Image src={images[0]} alt="noimg"  width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%', objectFit:'cover'}}/>
            <div className="price text-xl font-bold">{price}</div>
            <div className="description text-sm">{description}</div>
        </div>
    )
}

export default ProductCards