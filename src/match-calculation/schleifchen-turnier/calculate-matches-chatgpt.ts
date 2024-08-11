import { Match, Team } from '@data/match/match'
import { Player } from 'src/http-client/entities/player/player'

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
            return b.setDifference - a.setDifference
        }
        return b.rating - a.rating
    })
}

function extractWaitingPlayers(
    players: PlayerWithStats[],
    maximumNumberMatches: number,
): PlayerWithStats[] {
    const maxPlayedGames = players.reduce((prev, player) => {
        return Math.max(prev, player.countOfPlayedGames)
    }, 0)

    const numberPossibleMatches = Math.floor(players.length / 4)
    const waitingPlayersDueToMissingFields =
        numberPossibleMatches > maximumNumberMatches
            ? (numberPossibleMatches - maximumNumberMatches) * 4
            : 0

    const waitingPlayersCount =
        (players.length % 4) + waitingPlayersDueToMissingFields

    const waitingPlayersIndices = new Set<number>()
    while (waitingPlayersIndices.size < waitingPlayersCount) {
        const randomWaitingPlayerIndex = Math.floor(
            Math.random() * players.length,
        )
        if (
            players[randomWaitingPlayerIndex].countOfPlayedGames <
            maxPlayedGames
        ) {
            continue
        }

        waitingPlayersIndices.add(randomWaitingPlayerIndex)
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
        const team1 = getNextPairing(players, previousMatches, 2)
        const team2 = getNextPairing(players, previousMatches, 0)

        // TODO: Ensure no repeat pairings
        const newMatch: Omit<Match, 'id'> = {
            players: {
                team1,
                team2,
            },
            results: [],
            round,
        }

        matches.push(newMatch)
    }

    return matches
}

function getNextPairing(
    players: PlayerWithStats[],
    previousMatches: Match[],
    offset: number,
): Team {
    const currentPlayer = players.splice(0, 1)[0]

    const previousPartners = getPreviousPartners(previousMatches, currentPlayer)
    let nextPartner = findNextPartner(previousPartners, players, offset)

    if (nextPartner === null) {
        nextPartner = findNextPartner(previousPartners, players, 0)
    }

    if (nextPartner === null) {
        nextPartner = players[offset]
    }

    const index = players.findIndex(
        (player) => player.name === nextPartner.name,
    )
    players.splice(index, 1)

    return [currentPlayer, nextPartner]
}

function getPreviousPartners(
    previousMatches: Match[],
    currentPlayer: PlayerWithStats,
): string[] {
    const previousPartners: string[] = []
    previousMatches.forEach((match) => {
        const isInTeam1 = match.players.team1.some(
            (player) => player.name === currentPlayer.name,
        )
        if (isInTeam1) {
            const partner = getPartnerFromTeam(
                match.players.team1,
                currentPlayer,
            )
            previousPartners.push(partner.name)
        }

        const isInTeam2 = match.players.team1.some(
            (player) => player.name === currentPlayer.name,
        )
        if (isInTeam2) {
            const partner = getPartnerFromTeam(
                match.players.team2,
                currentPlayer,
            )
            previousPartners.push(partner.name)
        }
    })

    return previousPartners
}

function getPartnerFromTeam(team: Team, currentPlayer: Player): Player {
    if (team[0] !== undefined && team[0].name === currentPlayer.name) {
        return team[1]
    } else {
        return team[0]
    }
}

function findNextPartner(
    previousPartners: string[],
    players: PlayerWithStats[],
    index: number,
): PlayerWithStats | null {
    if (index > players.length - 1) {
        return null
    }

    const possiblePartner = players[index]

    if (previousPartners.includes(possiblePartner.name) === false) {
        return possiblePartner
    }

    return findNextPartner(previousPartners, players, index + 1)
}
