import { Player } from '@data/player/player'

type Result = {
    team1: number
    team2: number
}

export type Match = {
    id: string
    players: {
        team1: Player[]
        team2: Player[]
    }
    results: Result[]
    round: number
}
