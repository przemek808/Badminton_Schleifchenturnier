import { CreatePlayer } from '@components/forms/create-player/create-player'
import { PlayerCard } from '@components/player-card/player-card'
import { data } from '@data/data'
import { FormEvent, useState } from 'react'

// async function getData() {
//     // const res = await fetch('https://api.example.com/...')
//     // // The return value is *not* serialized
//     // // You can return Date, Map, Set, etc.

//     // if (!res.ok) {
//     //     // This will activate the closest `error.js` Error Boundary
//     //     throw new Error('Failed to fetch data')
//     // }

//     // return res.json()

//     data.player.getAll()
// }

export default async function Page() {
    // const data = await getData()
    const players = await data.player.getAll()

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
