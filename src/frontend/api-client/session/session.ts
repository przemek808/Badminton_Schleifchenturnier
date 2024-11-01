import { z } from 'zod'

export const sessionSchema = z.object({
    role: z.union([z.literal('admin'), z.literal('user')]),
})

export type Session = z.infer<typeof sessionSchema>
