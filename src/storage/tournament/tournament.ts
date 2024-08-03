import { Player } from 'src/storage/player/player'
import { z } from 'zod'

export const resultSchema = z.object({
    team1: z.preprocess(
        (x) => parseInt(x as string),
        z.number().int().nonnegative(),
    ),
    team2: z.preprocess(
        (x) => parseInt(x as string),
        z.number().int().nonnegative(),
    ),
})

export type Result = z.infer<typeof resultSchema>

export type Match = {
    id: string
    players: {
        team1: Player[]
        team2: Player[]
    }
    results: Result[]
    round: number
}

export type Tournament = {
    activeRound: number | null
    matches: Match[]
}
