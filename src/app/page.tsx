import { MatchCard } from '@components/match-card/match-card'
import { NextRound } from '@components/next-round/next-round'
import { getCurrentRoundNumber } from '@data/match/get-current-round-number'
import { Match } from '@data/match/match'
import { Col, Container, Row } from 'react-bootstrap'

async function getData(): Promise<{
    matches: Match[]
    currentRoundNumber: number
}> {
    const res = await fetch('http://localhost:4000/matches', {
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

    const matches: Match[] = await res.json()
    const currentRoundNumber = getCurrentRoundNumber(matches)

    const currentMatches = matches.filter(
        (match) => match.round === currentRoundNumber,
    )

    return {
        matches: currentMatches,
        currentRoundNumber,
    }
}

export default async function Home() {
    const { currentRoundNumber, matches } = await getData()

    return (
        <main className="px-3">
            <h1>Badminton Schleifchenturnier</h1>
            <h2>Matches</h2>
            <div>Aktive Runde: {currentRoundNumber}</div>
            {matches.length === 0 ? (
                <div>Keine Matches gefunden!</div>
            ) : (
                <Container fluid className="px-0">
                    <Row xs={1} lg={2} xxl={3} className="g-2">
                        {matches.map((match, index) => (
                            <Col xs key={match.id}>
                                <MatchCard
                                    match={match}
                                    displayNumber={index + 1}
                                />
                            </Col>
                        ))}
                    </Row>
                </Container>
            )}
        </main>
    )
}
