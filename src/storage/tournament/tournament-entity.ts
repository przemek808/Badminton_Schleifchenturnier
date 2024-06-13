import { Tournament, Match } from './tournament'

export type TournamentEntity = {
    round: {
        next(): void
        getMatches(round: number): Match[]
    }
    match: {
        create(match: Omit<Match, 'id' | 'round'>): void
        update(matchId: string, changes: Partial<Omit<Match, 'id'>>): Match
    }
    getMatches(): Match[]
}

const data: Tournament = {
    activeRound: null,
    matches: [],
}

export const tournamentEntity: TournamentEntity = {
    match: {
        create(match) {
            if (data.activeRound === null) {
                throw new Error("Can't add match. There is no active round.")
            }

            data.matches.push({
                id: crypto.randomUUID(),
                round: data.activeRound,
                ...match,
            })
        },
        update(matchId, changes) {
            const match = data.matches.find((match) => {
                match.id === matchId
            })

            if (match === undefined) {
                throw new Error("Can't update match. Match not found.")
            }

            Object.assign(match, changes)

            return {
                ...match,
                players: {
                    ...match.players,
                },
            }
        },
    },
    round: {
        next() {
            if (data.activeRound === null) {
                data.activeRound = 1
                return
            }

            data.activeRound += 1
        },
        getMatches(round) {
            const foundMatches = data.matches.filter(
                (match) => match.round === round,
            )

            if (foundMatches.length === 0) {
                throw new Error(`No matches found for given round: "${round}"`)
            }

            return foundMatches
        },
    },
    getMatches() {
        return data.matches
    },
}
