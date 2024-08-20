import {z} from 'zod';

export const categorySchemaForProduct = z.object({
    parentCategory:z.object({
        name:z.string()
    }),
    subCategory:z.object({
        name:z.string()
    })
})

export const saveProduct = z.object({
    name:z.string(),
    description:z.string().max(50,{message:'description not more than 50 words'}),
    specification:z.string().max(50,{message:'description not more than 50 words'}),
    quantity:z.number(),
    category:categorySchemaForProduct,
    price:z.number(),
    discount:z.number({message:'write the percent of discount you have to provide in the product'}),
    shippingCharge:z.number(),
    images:z.array(z.string())
})