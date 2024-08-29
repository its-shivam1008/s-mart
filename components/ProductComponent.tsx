import React, { FunctionComponent } from 'react'
import ProductCards from './productCards'
import { Product } from '@/models/Product'

interface ProductData {
    productData:Product[]
}

const ProductComponent:FunctionComponent<ProductData> = ({productData}) => {
  return (
    <div className='container'>
        <div className="md:grid md:grid-cols-4 flex flex-col gap-5 justify-center">
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