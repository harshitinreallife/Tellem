import { z } from 'zod'

export const usernameValidation = z.string()
    .min(3, "Username must be atleast 3 charecter long")
    .max(20, "Username must be less than 20 charecter long")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")


    
export const emailValidation = z.string()
    .email({ message: "Invalid email" })



export const passwordValidation = z.string()
    .min(8, "Password must be atleast 8 charecter long")
    .max(20, "Password must be less than 20 charecter long")
    .regex(/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]+$/,"Password can contain letters, numbers, and special characters")



export const signupSchema = z.object({
    username: usernameValidation,
    email: emailValidation,
    password: passwordValidation
})