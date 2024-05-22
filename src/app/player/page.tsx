import { CreatePlayer } from '@components/forms/create-player/create-player'
import { PlayerCard } from '@components/player-card/player-card'

async function getData(): Promise<any[]> {
    const res = await fetch('http://localhost:3000/api/player', {
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache',
    })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Page() {
    // const data = await getData()
    const players = await getData()

    return (
        <main>
            <div>
                {players.map((player) => (
                    <PlayerCard player={player} key={player.name} />
                ))}
            </div>
            <div>
                <CreatePlayer />
            </div>
        </main>
    )
}
