import { z } from 'zod'

export const playerMutationPayloadSchema = z.object({
    name: z.string(),
    rating: z.number().positive().int(),
})

export const playerSchema = playerMutationPayloadSchema.extend({
    id: z.number().positive().int(),
})

export type Player = z.infer<typeof playerSchema>
export type PlayerMutationPayload = z.infer<typeof playerMutationPayloadSchema>
