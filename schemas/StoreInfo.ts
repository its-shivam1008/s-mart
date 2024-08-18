import {z} from 'zod';


export const basicStoreInfo = z.object({
    owner_name:z.string({required_error:'Owner name is required'}),
    contact:z.string({required_error:'Contact is required'}),
    businessName:z.string({required_error:'Business name is required'}),
    storeName:z.string({required_error:'Store name is required'}),
    category:z.string({required_error:'Category is required'})
})

export const businessAddress  = z.object({
    address:z.string(),
    street:z.string(),
    pincode:z.string(),
    state:z.string(),
    city:z.string(),
    country:z.string(),
})

export const paymentIntegration = z.object({
    id:z.string(),
    secret:z.string()
})