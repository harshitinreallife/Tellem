import { z } from 'zod'

export const signInSchema = z.object({
    email: z.string()
        .email("Invalid email"),
    password: z.string()
        .min(8, "Password must be atleast 8 charecter long")
        .max(20, "Password must be less than 20 charecter long")
        .regex(/^[a-zA-Z0-9_]+$/, "Password can only contain letters, numbers, and underscores")
})