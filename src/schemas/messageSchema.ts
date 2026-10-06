import { z } from 'zod'

export const messageSchema = z.object({
    content: z
        .string()
        .min(10, "Message must be atleast 10 charecter long")
        .max(500, "Message must be less than 500 charecter long")
})