import { playerSchema } from 'src/http-client/entities/player/player'
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

const teamSchema = playerSchema.array()
export const matchSchema = z.object({
    id: z.number(),
    players: z.object({
        team1: teamSchema,
        team2: teamSchema,
    }),
    results: resultSchema.array(),
    round: positiveNonNegativeNumberSchema,
})

export type Team = z.infer<typeof teamSchema>
export type Match = z.infer<typeof matchSchema>
