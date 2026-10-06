import {z} from 'zod'

export const verifySchema = z.object({
    code: z.string()
        .min(6, "Code must be 6 numbers")
    
})