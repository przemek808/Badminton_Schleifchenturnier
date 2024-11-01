import { Container, Row } from 'react-bootstrap'
import { PageWrapper } from '../common/page-wrapper/page-wrapper.js'
import { useRouteContext } from '@tanstack/react-router'

export function PlayersPage() {
    // const client = getHttpClient({ fetch, host: 'http://localhost:3000' })
    // const players = await client.players.getAll()
    const { session } = useRouteContext({ from: '/players' })

    return (
        <PageWrapper adminOnly session={session}>
            <Container fluid className="px-0">
                <Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6} className="g-2">
                    {/* {players.map((player) => (
                        <Col xs key={player.name}>
                            <PlayerCard player={player} />
                        </Col>
                    ))} */}
                </Row>
            </Container>
            <div className="mt-5">{/* <PlayerForm type="create" /> */}</div>
            <div className="mt-5">{/* <ImportPlayer /> */}</div>
        </PageWrapper>
    )
}
