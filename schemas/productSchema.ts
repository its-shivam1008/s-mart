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
    description:z.string().max(100,{message:'Description not more than 100 characters'}),
    specification:z.string().max(150,{message:'Specification not more than 150 characters'}),
    quantity:z.number(),
    category:categorySchemaForProduct,
    price:z.number(),
    discount:z.number({message:'write the percent of discount you have to provide in the product'}),
    shippingCharge:z.number(),
    images: z.any()
    .refine(value => value.length > 0, {
        message: "At least one image is required",
      })
        .refine(files => Array.from(files).every(file => ACCEPTED_IMAGE_TYPES.includes((file as any).type)), "Only these types are allowed .jpg, .jpeg, .png and .webp")
})