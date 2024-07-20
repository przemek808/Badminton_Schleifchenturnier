import { Tournament, Match } from './tournament'

export type TournamentEntity = {
    match: {
        create(match: Omit<Match, 'id' | 'round' | 'results'>): void
        update(matchId: string, changes: Partial<Omit<Match, 'id'>>): Match
    }
    nextRound(): number
    getAllMatches(): Match[]
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
                results: [],
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
    nextRound() {
        if (data.activeRound === null) {
            data.activeRound = 1
        } else {
            data.activeRound += 1
        }

        return data.activeRound
    },
    getAllMatches() {
        return data.matches
    },
}
