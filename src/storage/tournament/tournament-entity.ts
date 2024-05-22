import { Tournament, Round, Match } from './tournament'

export type TournamentEntity = {
    round: {
        create(): void
        end(): void
        getMatches(roundID: string): Match[]
    }
    match: {
        create(match: Omit<Match, 'id'>): void
        update(matchID: string, changes: Partial<Omit<Match, 'id'>>): Match
    }
    getRounds(): Round[]
}

const data: Tournament = {
    rounds: [
        {
            active: false,
            id: '1234',
            matches: [
                {
                    id: '111',
                    players: {
                        team1: [
                            {
                                name: 'Martin',
                                rating: 40,
                            },
                            {
                                name: 'Paul',
                                rating: 40,
                            },
                        ],
                        team2: [
                            {
                                name: 'Uwe',
                                rating: 40,
                            },
                            {
                                name: 'Torsten',
                                rating: 40,
                            },
                        ],
                    },
                    results: [
                        {
                            team1: 12,
                            team2: 3,
                        },
                        {
                            team1: 12,
                            team2: 8,
                        },
                    ],
                },
            ],
        },
    ],
    activeRound: null,
}

export const tournamentEntity: TournamentEntity = {
    match: {
        create(match) {
            if (data.activeRound === null) {
                throw new Error("Can't add match. There is no active round.")
            }

            data.activeRound.matches.push({
                id: crypto.randomUUID(),
                ...match,
            })
        },
        update(matchID, changes) {
            let match: Match | undefined
            data.rounds.find((round) => {
                const foundMatch = round.matches.find(
                    (match) => match.id === matchID,
                )

                if (foundMatch !== undefined) {
                    match = foundMatch
                    return true
                }
            })

            if (match === undefined) {
                throw new Error("Can't update match. Match not found.")
            }

            match = {
                ...match,
                ...changes,
                players: {
                    ...match.players,
                    ...changes.players,
                },
            }

            return {
                ...match,
                players: {
                    ...match.players,
                },
            }
        },
    },
    round: {
        create() {
            if (data.activeRound !== null && data.activeRound.active === true) {
                throw new Error(
                    'There is an active open round. End current round before creating a new one',
                )
            }

            const newRound: Round = {
                id: crypto.randomUUID(),
                active: true,
                matches: [],
            }

            data.rounds.push(newRound)
            data.activeRound = newRound
        },
        end() {
            if (data.activeRound === null) {
                throw new Error('No active round existing')
            }

            data.activeRound.active = false
        },
        getMatches(roundID) {
            const foundRound = data.rounds.find((round) => round.id === roundID)

            if (foundRound === undefined) {
                throw new Error('Round not found')
            }

            return foundRound.matches
        },
    },
    getRounds() {
        return data.rounds
    },
}
