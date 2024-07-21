import { getCurrentRoundNumber } from '@data/match/get-current-round-number'
import { calculateMatches } from '../../../match-calculation/schleifchen-turnier/calculate-matches-chatgpt'

const MAXIMUM_NUMBER_MATCHES = 10

export async function GET() {
    const allMatches: any[] = await (
        await fetch('http://localhost:4000/matches', {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    ).json()
    const allPlayers: any[] = await (
        await fetch('http://localhost:4000/players', {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    ).json()

    const currentRoundNumber = getCurrentRoundNumber(allMatches)

    const newMatches = calculateMatches(
        allPlayers,
        allMatches,
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
