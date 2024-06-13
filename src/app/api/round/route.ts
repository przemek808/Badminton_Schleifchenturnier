import { storage } from 'src/storage'

export async function GET() {
    const allRounds = await storage.tournament.getMatches()

    return Response.json(allRounds)
}
