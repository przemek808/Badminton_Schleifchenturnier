import { CreatePlayer } from '@components/forms/create-player/create-player'
import { ImportPlayer } from '@components/forms/import-player/import-player'
import { PlayerCard } from '@components/player-card/player-card'
import { Col, Container, Row } from 'react-bootstrap'
import { getHttpClient } from 'src/http-client/http-client'

export default async function Page() {
    const client = getHttpClient({ fetch, host: 'http://localhost:3000' })
    const players = await client.players.getAll()

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
