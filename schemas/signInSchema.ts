import {z} from "zod";
export const signInSchema = z.object({
    identifier:z.string(),
    password:z.string()
})

export const checkPasswordSchema = z.object({
    password:z.string()
})