import { calculateMatches } from 'src/match-calculation/schleifchen-turnier/calculate-matches'
import { GET as getAllMatches, POST as postNewMatches } from '../matches/route'
import { GET as getAllPlayers } from '../players/route'
import { Match } from '@data/tournament/tournament'

export async function GET() {
    const allMatches: any[] = await (await getAllMatches()).json()
    const allPlayers: any[] = await (await getAllPlayers()).json()

    const lastRoundNumber = allMatches.reduce((prev, curr) => {
        if (prev < curr.round) {
            return curr.round
        }

        return prev
    }, 0)

    const newMatches = calculateMatches(allMatches, allPlayers)

    const matchesToPush = newMatches.map(
        (match): Omit<Match, 'id' | 'results'> => ({
            ...match,
            round: lastRoundNumber + 1,
        }),
    )

    await fetch('http://localhost:3000/api/matches', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(matchesToPush),
    })

    return Response.json(newMatches)
}
