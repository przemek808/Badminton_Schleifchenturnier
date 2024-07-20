import { Round } from 'src/storage/tournament/tournament'
import styles from './match.module.css'

async function getData(): Promise<any[]> {
    const res = await fetch('http://localhost:3000/api/round', {
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

export default async function Match() {
    const rounds = await getData()

    return rounds.map((round: Round, index) => (
        <div key={index + 1}>
            <h1>{`${index + 1}. Runde`}</h1>
            {round.active ? <span>(aktive Runde)</span> : null}
            {round.matches.map((match) => (
                <div key={round.id} className={styles.matches}>
                    <span>
                        <div>Team 1</div>
                        <>
                            {match.players.team1.map((player) => (
                                <div key={player.name}>{player.name}</div>
                            ))}
                        </>
                    </span>
                    {match.results.map((result, index) => (
                        <span
                            key={index}
                        >{`${result.team1} : ${result.team2}`}</span>
                    ))}
                    <span>
                        <div>Team 2</div>
                        <>
                            {match.players.team2.map((player) => (
                                <div key={player.name}>{player.name}</div>
                            ))}
                        </>
                    </span>
                </div>
            ))}
        </div>
    ))
}
