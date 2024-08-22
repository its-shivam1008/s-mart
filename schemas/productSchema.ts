import {z} from 'zod';

export const categorySchemaForProduct = z.object({
    parentCategory:z.object({
        name:z.string()
    }),
    subCategory:z.object({
        name:z.string()
    })
})

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const saveProduct = z.object({
    name:z.string(),
    description:z.string().max(50,{message:'description not more than 50 words'}),
    specification:z.string().max(50,{message:'description not more than 50 words'}),
    quantity:z.number(),
    category:categorySchemaForProduct,
    price:z.number(),
    discount:z.number({message:'write the percent of discount you have to provide in the product'}),
    shippingCharge:z.number(),
    images: z.any()
        .refine(files => Array.from(files).every(file => ACCEPTED_IMAGE_TYPES.includes((file as any).type)), "Only these types are allowed .jpg, .jpeg, .png and .webp")
})