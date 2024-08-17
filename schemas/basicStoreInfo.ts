import {z} from 'zod';


export const basicStoreInfo = z.object({
    owner_name:z.string(),
    contact:z.string(),
    businessName:z.string(),
    storeName:z.string(),
    category:z.string()
})