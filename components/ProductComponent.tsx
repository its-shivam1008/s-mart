'use client'
import React, { FunctionComponent } from 'react'
import ProductCards from './ProductCards'


interface ProductData {
    productData:any[]
}

const ProductComponent:FunctionComponent<ProductData> = ({productData}) => {
    // console.log('yaha prod comp ' , productData)
  return (
    <div className='container'>
        <div className="md:grid md:grid-cols-4 flex flex-col gap-5 justify-center mx-auto">
            {productData.map((product, index) => {
                return <div key={index}>
                    <ProductCards cardInfo={product}/>
                </div>
            })}
        </div>
    </div>
  )
}

export default ProductComponent