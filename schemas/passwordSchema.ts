import {z} from 'zod';

export const passwordSchema = z.object({
    password:z.string().min(6, {message:'Password is at least of 6 characters'})
})