import { Player } from '@data/player/player'

export async function createPlayer(data: Player): Promise<any[]> {
    const res = await fetch('http://localhost:3000/api/player', {
        method: 'POST',
        body: JSON.stringify(data),
    })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}
