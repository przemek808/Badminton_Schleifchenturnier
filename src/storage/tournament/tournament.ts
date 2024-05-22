import { Player } from 'src/storage/player/player'

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
}

export type Round = {
    id: string
    matches: Match[]
    active: boolean
}

export type Tournament = {
    rounds: Round[]
    activeRound: Round | null
}
