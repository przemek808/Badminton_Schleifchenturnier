import { storage } from 'src/storage'

export async function GET() {
    const allRounds = await storage.tournament.getRounds()

    return Response.json(allRounds)
}
