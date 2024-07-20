export async function GET() {
    const response = await fetch('http://localhost:4000/matches', {
        method: 'GET',
        headers: { 'Content-Type': 'Application/json' },
    })

    const data = await response.json()

    return Response.json(data)
}

function postMatch(player: any): Promise<Response> {
    return fetch('http://localhost:4000/matches', {
        method: 'POST',
        body: JSON.stringify(player),
        headers: { 'Content-Type': 'Application/json' },
    })
}

export async function POST(request: Request) {
    try {
        const matches = await request.json()

        if (Array.isArray(matches)) {
            const result = await Promise.allSettled([
                matches.map((player) => postMatch(player)),
            ])

            const errors = result.filter((value) => {
                value.status === 'rejected'
            })

            if (errors.length > 0) {
                console.error({ errors })
            }
        } else {
            postMatch(matches)
        }
    } catch (error) {
        return Response.error()
    }

    return new Response()
}
