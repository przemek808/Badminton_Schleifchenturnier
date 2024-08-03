import { getCurrentRoundNumber } from '@data/match/get-current-round-number'
import { calculateMatches } from '../../../match-calculation/schleifchen-turnier/calculate-matches-chatgpt'
import { matchSchema } from '@data/match/match'
import { isRoundValid } from 'src/match-calculation/verify-round'
import { STATUS_CODES } from 'http'

const MAXIMUM_NUMBER_MATCHES = 10

export async function GET() {
    const response = await fetch('http://localhost:4000/matches', {
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache',
    })
    const allMatches: unknown = await response.json()

    const parsedMatches = matchSchema.array().parse(allMatches)

    const currentRoundNumber = getCurrentRoundNumber(parsedMatches)
    const matchesOfCurrentRound = parsedMatches.filter(
        (match) => match.round === currentRoundNumber,
    )

    if (!isRoundValid(matchesOfCurrentRound)) {
        const response = new Response('Missing Results', {
            status: 406,
            statusText: 'Missing Results',
        })

        return response
    }

    const allPlayers: any[] = await (
        await fetch('http://localhost:4000/players', {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    ).json()

    const newMatches = calculateMatches(
        allPlayers,
        parsedMatches,
        currentRoundNumber + 1,
        MAXIMUM_NUMBER_MATCHES,
    )

    await fetch('http://localhost:3000/api/matches', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMatches),
    })

    return new Response()
}
