import { storage } from 'src/storage'

export async function GET() {
    console.log('test')
    const allRounds = await storage.tournament.getRounds()
    console.log('test2')

    return Response.json(allRounds)
}
