import { storage } from 'src/storage'

export async function GET() {
    const allPlayers = await storage.player.getAll()

    return Response.json(allPlayers)
}

export async function POST(request: Request) {
    console.log(request.body)

    if (request.body === null) {
        console.error('No request body')
        return Response.error()
    }

    const player = await request.json()

    try {
        storage.player.create(player)
    } catch (error) {
        return Response.error()
    }

    return Response.json(player)
}
