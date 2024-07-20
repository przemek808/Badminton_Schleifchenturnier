export async function GET() {
    const response = await fetch('http://localhost:4000/players', {
        method: 'GET',
        headers: { 'Content-Type': 'Application/json' },
    })

    const data = await response.json()

    return Response.json(data)
}

function postPlayer(player: any): Promise<Response> {
    return fetch('http://localhost:4000/players', {
        method: 'POST',
        body: JSON.stringify(player),
        headers: { 'Content-Type': 'Application/json' },
    })
}

export async function POST(request: Request) {
    try {
        const players = await request.json()

        if (Array.isArray(players)) {
            const result = await Promise.allSettled([
                players.map((player) => postPlayer(player)),
            ])

            const errors = result.filter((value) => {
                value.status === 'rejected'
            })

            if (errors.length > 0) {
                console.error({ errors })
            }
        } else {
            postPlayer(players)
        }
    } catch (error) {
        return Response.error()
    }

    return new Response()
}
