import { MatchCard } from '@components/match-card/match-card'
import { Match } from '@data/tournament/tournament'
import { Col, Container, Row } from 'react-bootstrap'

async function getData(): Promise<any[]> {
    const res = await fetch('http://localhost:3000/api/matches', {
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

export default async function MatchesPage() {
    const matches = await getData()

    return (
        <main>
            {matches.length === 0 ? (
                <div>Keine Matches gefunden!</div>
            ) : (
                <Container fluid className="px-3">
                    <Row xs={1} lg={2} xxl={3} className="g-2">
                        {matches.map((match) => (
                            <Col xs key={match.name}>
                                <MatchCard match={match} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            )}
        </main>
    )
}
