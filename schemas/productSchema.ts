import { z } from 'zod';

export const categorySchemaForProduct = z.object({
    parentCategory: z.object({
        name: z.string()
    }),
    subCategory: z.object({
        name: z.string(),
        // properties: z.array(z.object({
        //     key: z.string(),
        //     value: z.union([
        //         z.string(),
        //         z.number(),
        //         z.array(z.string()),
        //         z.array(z.number()),
        //     ]),
        // })),
    }),
});

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const saveProduct = z.object({
    name: z.string(),
    description: z.string().max(100, { message: 'Description not more than 100 characters' }),
    specification: z.string().max(150, { message: 'Specification not more than 150 characters' }),
    quantity: z.number(),
    category: categorySchemaForProduct,
    price: z.number(),
    discount: z.number({ message: 'write the percent of discount you have to provide in the product' }).max(99, { message: 'Discount cannot be more than 99%' }).min(0, { message: 'Discount not less than 0%' }),
    shippingCharge: z.number(),
    images: z.any()
        .refine(value => value.length > 0, {
            message: "At least one image is required",
        })
        .refine(files => Array.from(files).every(file => ACCEPTED_IMAGE_TYPES.includes((file as any).type)), "Only these types are allowed .jpg, .jpeg, .png and .webp")
})


export const updateProduct = z.object({
    name: z.string().optional(),
    description: z.string().max(100, { message: 'Description not more than 100 characters' }).optional(),
    specification: z.string().max(150, { message: 'Specification not more than 150 characters' }).optional(),
    quantity: z.number().optional(),
    price: z.number().optional(),
    discount: z.number({ message: 'write the percent of discount you have to provide in the product' }).max(99, { message: 'Discount cannot be more than 99%' }).min(0, { message: 'Discount not less than 0%' }).optional(),
    shippingCharge: z.number().optional(),
    images: z.any()
        .refine(files => Array.from(files).every(file => ACCEPTED_IMAGE_TYPES.includes((file as any).type)), "Only these types are allowed .jpg, .jpeg, .png and .webp").optional()
})

export const addReviewSchema = z.object({
    review: z.string().min(1, { message: "Write something to add a review!" }).max(200, { message: 'Review not more than 200 characters' }).optional(),
    star: z.number().optional()
})


export const searchProduct = z.object({
    search: z.string().min(1, { message: 'Type something to search' })
})