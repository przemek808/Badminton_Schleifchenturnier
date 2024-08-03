import { Player, playerSchema } from '@data/player/player'
import { z } from 'zod'

const positiveNonNegativeNumberSchema = z.preprocess(
    (x) => parseInt(x as string),
    z.number().int().nonnegative(),
)

export const resultSchema = z.object({
    team1: positiveNonNegativeNumberSchema,
    team2: positiveNonNegativeNumberSchema,
})

export type Result = z.infer<typeof resultSchema>

export const matchSchema = z.object({
    id: z.number(),
    players: z.object({
        team1: playerSchema.array(),
        team2: playerSchema.array(),
    }),
    results: resultSchema.array(),
    round: positiveNonNegativeNumberSchema,
})

export type Match = z.infer<typeof matchSchema>
