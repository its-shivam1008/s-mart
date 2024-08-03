import {z} from "zod";
export const usernameValidation = z
    .string()
    .min(2,"username at least 2 characters")
    .max(20, "username not more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "special charcters not allowed")

export const signUpSchema = z.object({
    username:usernameValidation,
    email:z.string().email({message:"Invalid email address"}),
    password:z.string().min(6,{message:"Password must be atleast of 6 characters"}),
    role:z.string().default('User').optional()
})