import {z} from 'zod';

export const saveParentCategory = z.object({
    name:z.string({required_error:'name is required'}),
    description:z.string({required_error:'name is required'}).min(10,{message:'Minimum length 10 characters'}).max(80, {message:'Max length 80 characters'}),
})

export const propertySchema = z.object({
    key: z.string().min(1, 'Property key is required'),
    values: z.array(z.string()).nonempty('Property values cannot be empty'),
});

export const saveSubCategory = z.object({
    name:z.string({required_error:'name is required'}),
    description:z.string({required_error:'name is required'}).min(10,{message:'Minimum length 10 characters'}).max(80, {message:'Max length 80 characters'}),
    parentCategoryName:z.string({required_error:'Category is required'}),
    // properties: z.array(propertySchema).nonempty('At least one property is required'),
})