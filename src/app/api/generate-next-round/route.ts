import { calculateMatches } from 'src/match-calculation/schleifchen-turnier/calculate-matches'
import { storage } from 'src/storage'

export async function GET() {
    const allMatches = await storage.tournament.getAllMatches()
    const allPlayers = await storage.player.getAll()

    const newMatches = calculateMatches(allMatches, allPlayers)

    return Response.json(newMatches)
}
