import { MatchCard } from '@components/match-card/match-card'
import { getCurrentRoundNumber } from '@data/match/get-current-round-number'
import { Match } from '@data/tournament/tournament'
import { Fragment } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

async function getData(): Promise<{
    matches: Match[]
    currentRoundNumber: number
}> {
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

    const matches: Match[] = await res.json()
    const currentRoundNumber = getCurrentRoundNumber(matches)

    return {
        matches,
        currentRoundNumber,
    }
}

export default async function MatchesPage() {
    const { currentRoundNumber, matches } = await getData()

    return (
        <main>
            {matches.length === 0 ? (
                <div>Keine Matches gefunden!</div>
            ) : (
                Array.from({ length: currentRoundNumber }).map((_, index) => {
                    const matchesOfRound = matches.filter(
                        (match) => match.round === index + 1,
                    )

                    return (
                        <Fragment>
                            <h2>Runde {index + 1}</h2>
                            <Container fluid className="px-3">
                                <Row xs={1} lg={2} xxl={3} className="g-2">
                                    {matchesOfRound.map((match, index) => (
                                        <Col xs key={match.id}>
                                            <MatchCard
                                                match={match}
                                                displayNumber={index + 1}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            </Container>
                        </Fragment>
                    )
                })
            )}
        </main>
    )
}
