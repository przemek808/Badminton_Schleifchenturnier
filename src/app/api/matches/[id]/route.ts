export async function PATCH(
    request: Request,
    { params: { id } }: { params: { id: string } },
) {
    const jsonData = await request.json()
    const response = await fetch(`http://localhost:4000/matches/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify(jsonData),
    })

    const data = await response.json()

    return Response.json(data)
}
