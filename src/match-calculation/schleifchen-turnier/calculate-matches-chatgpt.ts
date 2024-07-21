import { Match } from '@data/match/match'
import { Player } from '@data/player/player'

export function calculateMatches(
    players: Player[],
    previousMatches: Match[],
    round: number,
    maximumNumberMatches: number,
) {
    const playersWithStats = calculateStats(players, previousMatches)
    const sortedPlayers = sortPlayers(playersWithStats)

    extractWaitingPlayers(sortedPlayers, maximumNumberMatches)

    // Create matches from the sorted and modified player list
    return createMatchesFromList(sortedPlayers, previousMatches, round)
}

type PlayerWithStats = Player & {
    countOfPlayedGames: number
    setDifference: number
}

function calculateStats(
    players: Player[],
    previousMatches: Match[],
): PlayerWithStats[] {
    return players.map((player) => {
        const playedGames: Match[] = previousMatches.filter((match) => {
            return (
                match.players.team1.some(
                    (teamMember) => teamMember.name === player.name,
                ) ||
                match.players.team2.some(
                    (teamMember) => teamMember.name === player.name,
                )
            )
        })

        const countOfPlayedGames = playedGames.length

        const setDifference = playedGames.reduce((prev, match) => {
            if (
                match.players.team1.some(
                    (teamMember) => teamMember.name === player.name,
                )
            ) {
                return prev + calculateSetDiffOfMatch(match, 'team1')
            } else {
                return prev + calculateSetDiffOfMatch(match, 'team2')
            }
        }, 0)

        return {
            ...player,
            countOfPlayedGames,
            setDifference,
        }
    })
}

function calculateSetDiffOfMatch(
    match: Match,
    team: 'team1' | 'team2',
): number {
    return match.results.reduce((prev, result) => {
        if (team === 'team1') {
            return (
                prev + getSetDiffValueFromPointDiff(result.team1 - result.team2)
            )
        } else {
            return (
                prev + getSetDiffValueFromPointDiff(result.team2 - result.team1)
            )
        }
    }, 0)
}

function getSetDiffValueFromPointDiff(points: number): 1 | 0 | -1 {
    if (points < 0) {
        return -1
    }

    if (points === 0) {
        return 0
    }

    return 1
}

function sortPlayers(players: PlayerWithStats[]): PlayerWithStats[] {
    return players.sort((a, b) => {
        if (a.setDifference !== b.setDifference) {
            return a.setDifference - b.setDifference
        }
        return a.rating - b.rating
    })
}

function extractWaitingPlayers(
    players: PlayerWithStats[],
    maximumNumberMatches: number,
): PlayerWithStats[] {
    const numberPossibleMatches = Math.floor(players.length / 4)
    const waitingPlayersDueToMissingFields =
        numberPossibleMatches > maximumNumberMatches
            ? (numberPossibleMatches - maximumNumberMatches) * 4
            : 0

    const waitingPlayersCount =
        (players.length % 4) + waitingPlayersDueToMissingFields

    const waitingPlayersIndices = new Set<number>()
    while (waitingPlayersIndices.size < waitingPlayersCount) {
        waitingPlayersIndices.add(Math.floor(Math.random() * players.length))
    }

    const waitingPlayers: PlayerWithStats[] = []
    for (const index of waitingPlayersIndices) {
        waitingPlayers.push(players.splice(index, 1)[0])
    }

    return waitingPlayers
}

function createMatchesFromList(
    players: PlayerWithStats[],
    previousMatches: Match[],
    round: number,
): Omit<Match, 'id'>[] {
    const matches: Omit<Match, 'id'>[] = []

    while (players.length > 0) {
        const player1 = extractLastPlayerFromList(players)
        const player2 = extractLastPlayerFromList(players)
        const player3 = extractLastPlayerFromList(players)
        const player4 = extractLastPlayerFromList(players)

        // TODO: Ensure no repeat pairings
        const newMatch: Omit<Match, 'id'> = {
            players: {
                team1: [player1, player4],
                team2: [player2, player3],
            },
            results: [],
            round,
        }

        matches.push(newMatch)
    }

    return matches
}

function extractLastPlayerFromList(players: PlayerWithStats[]): Player {
    const player = players.pop()

    if (player === undefined) {
        throw new Error('Could not get player due to empty list')
    }

    return {
        name: player.name,
        rating: player.rating,
    }
}