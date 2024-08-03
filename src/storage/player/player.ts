import { z } from 'zod'

export const playerSchema = z.object({
    name: z.string(),
    rating: z.number().positive().int(),
})

export type Player = z.infer<typeof playerSchema>
