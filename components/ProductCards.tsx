import { Product } from '@/models/Product'
import Image from 'next/image'
import React, { FunctionComponent } from 'react'

interface CardInfo {
    cardInfo: Product
}

const ProductCards:FunctionComponent<CardInfo> = ({cardInfo}) => {
    const { name , images, price, description } = cardInfo
    return (
        <div className="eleProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
            <div className="title text-xl font-semibold">{name}</div>
            <Image src={images[0]} alt="noimg" />
            <div className="price text-xl font-bold">{price}</div>
            <div className="description text-sm">{description}</div>
        </div>
    )
}

export default ProductCards