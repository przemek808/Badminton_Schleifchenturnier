import { storage } from 'src/storage'

export async function GET() {
    const allPlayers = await storage.player.getAll()

    return Response.json(allPlayers)
}

export async function POST(request: Request) {
    try {
        const players = await request.json()

        if (Array.isArray(players)) {
            const result = await Promise.allSettled([
                players.map((player) => {
                    return storage.player.create(player)
                }),
            ])

            const errors = result.filter((value) => {
                value.status === 'rejected'
            })
        } else {
            storage.player.create(players)
        }
    } catch (error) {
        return Response.error()
    }

    return new Response()
}
