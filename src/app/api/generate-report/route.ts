import { Match, matchSchema } from '@data/match/match'
import { Player } from 'src/http-client/entities/player/player'

type Result = {
    wonSets: number
    lostSets: number
    wonPoints: number
    lostPoints: number
}

type PlayerResult = Result & {
    player: Player
}

function getTeamResults(match: Match) {
    const team1Result = match.results.reduce(
        (prev, curr) => {
            const setDiff = curr.team1 - curr.team2

            if (setDiff > 0) {
                return {
                    wonSets: prev.wonSets + 1,
                    lostSets: prev.lostSets,
                    wonPoints: prev.wonPoints + curr.team1,
                    lostPoints: prev.lostPoints + curr.team2,
                }
            }

            if (setDiff < 0) {
                return {
                    wonSets: prev.wonSets,
                    lostSets: prev.lostSets + 1,
                    wonPoints: prev.wonPoints + curr.team1,
                    lostPoints: prev.lostPoints + curr.team2,
                }
            }

            return {
                wonSets: prev.wonSets,
                lostSets: prev.lostSets,
                wonPoints: prev.wonPoints + curr.team1,
                lostPoints: prev.lostPoints + curr.team2,
            }
        },
        {
            wonSets: 0,
            lostSets: 0,
            wonPoints: 0,
            lostPoints: 0,
        },
    )

    const team2Result = match.results.reduce(
        (prev, curr) => {
            const setDiff = curr.team2 - curr.team1

            if (setDiff > 0) {
                return {
                    wonSets: prev.wonSets + 1,
                    lostSets: prev.lostSets,
                    wonPoints: prev.wonPoints + curr.team2,
                    lostPoints: prev.lostPoints + curr.team1,
                }
            }

            if (setDiff < 0) {
                return {
                    wonSets: prev.wonSets,
                    lostSets: prev.lostSets + 1,
                    wonPoints: prev.wonPoints + curr.team2,
                    lostPoints: prev.lostPoints + curr.team1,
                }
            }

            return {
                wonSets: prev.wonSets,
                lostSets: prev.lostSets,
                wonPoints: prev.wonPoints + curr.team2,
                lostPoints: prev.lostPoints + curr.team1,
            }
        },
        {
            wonSets: 0,
            lostSets: 0,
            wonPoints: 0,
            lostPoints: 0,
        },
    )

    return {
        team1Result,
        team2Result,
    }
}

export async function GET() {
    const response = await fetch('http://localhost:4000/matches', {
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache',
    })
    const allMatches: unknown = await response.json()

    const parsedMatches = matchSchema.array().parse(allMatches)

    const result: PlayerResult[] = []

    for (const match of parsedMatches) {
        const { team1Result, team2Result } = getTeamResults(match)

        const teamOnePlayerOne = result.find(
            (r) => r.player.id === match.players.team1[0].id,
        )
        if (teamOnePlayerOne) {
            teamOnePlayerOne.wonSets += team1Result.wonSets
            teamOnePlayerOne.lostSets += team1Result.lostSets
            teamOnePlayerOne.wonPoints += team1Result.wonPoints
            teamOnePlayerOne.lostPoints += team1Result.lostPoints
        } else {
            result.push({
                player: match.players.team1[0],
                wonSets: team1Result.wonSets,
                lostSets: team1Result.lostSets,
                wonPoints: team1Result.wonPoints,
                lostPoints: team1Result.lostPoints,
            })
        }

        const teamOnePlayerTwo = result.find(
            (r) => r.player.id === match.players.team1[1].id,
        )
        if (teamOnePlayerTwo) {
            teamOnePlayerTwo.wonSets += team1Result.wonSets
            teamOnePlayerTwo.lostSets += team1Result.lostSets
            teamOnePlayerTwo.wonPoints += team1Result.wonPoints
            teamOnePlayerTwo.lostPoints += team1Result.lostPoints
        } else {
            result.push({
                player: match.players.team1[1],
                wonSets: team1Result.wonSets,
                lostSets: team1Result.lostSets,
                wonPoints: team1Result.wonPoints,
                lostPoints: team1Result.lostPoints,
            })
        }

        const teamTwoPlayerOne = result.find(
            (r) => r.player.id === match.players.team2[0].id,
        )
        if (teamTwoPlayerOne) {
            teamTwoPlayerOne.wonSets += team2Result.wonSets
            teamTwoPlayerOne.lostSets += team2Result.lostSets
            teamTwoPlayerOne.wonPoints += team2Result.wonPoints
            teamTwoPlayerOne.lostPoints += team2Result.lostPoints
        } else {
            result.push({
                player: match.players.team2[0],
                wonSets: team2Result.wonSets,
                lostSets: team2Result.lostSets,
                wonPoints: team2Result.wonPoints,
                lostPoints: team2Result.lostPoints,
            })
        }

        const teamTwoPlayerTwo = result.find(
            (r) => r.player.id === match.players.team2[1].id,
        )
        if (teamTwoPlayerTwo) {
            teamTwoPlayerTwo.wonSets += team2Result.wonSets
            teamTwoPlayerTwo.lostSets += team2Result.lostSets
            teamTwoPlayerTwo.wonPoints += team2Result.wonPoints
            teamTwoPlayerTwo.lostPoints += team2Result.lostPoints
        } else {
            result.push({
                player: match.players.team2[1],
                wonSets: team2Result.wonSets,
                lostSets: team2Result.lostSets,
                wonPoints: team2Result.wonPoints,
                lostPoints: team2Result.lostPoints,
            })
        }
    }

    const sortedResult = result.sort((a, b) => {
        const setDiffA = a.wonSets - a.lostSets
        const setDiffB = b.wonSets - b.lostSets
        const wonSets = setDiffB - setDiffA

        if (wonSets !== 0) {
            return wonSets
        }

        const pointDiffA = a.wonPoints - a.lostPoints
        const pointDiffB = b.wonPoints - b.lostPoints
        const wonPoints = pointDiffB - pointDiffA

        return wonPoints
    })

    return new Response(JSON.stringify(sortedResult), {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
