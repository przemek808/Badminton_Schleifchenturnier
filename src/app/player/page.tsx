import { CreatePlayer } from '@components/forms/create-player/create-player'
import { ImportPlayer } from '@components/forms/import-player/import-player'
import { PlayerCard } from '@components/player-card/player-card'
import { Col, Container, Row } from 'react-bootstrap'

async function getData(): Promise<any[]> {
    const res = await fetch('http://localhost:3000/api/players', {
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
    const players = await getData()

    return (
        <main>
            <Container fluid className="px-3">
                <Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6} className="g-2">
                    {players.map((player) => (
                        <Col xs key={player.name}>
                            <PlayerCard player={player} />
                        </Col>
                    ))}
                </Row>
            </Container>
            <div className="mt-5 px-3">
                <CreatePlayer />
            </div>
            <div className="mt-5 px-3">
                <ImportPlayer />
            </div>
        </main>
    )
}
