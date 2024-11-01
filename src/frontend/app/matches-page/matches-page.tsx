// import { MatchCard } from '@components/match-card/match-card'
// import { RoundManagement } from '@components/round-management/round-management'
import { useRouteContext } from '@tanstack/react-router'
import { PageWrapper } from '../common/page-wrapper/page-wrapper.js'
// import { getCurrentRoundNumber } from '@data/match/get-current-round-number'
// import { Match } from '@data/match/match'
// import {
//     Accordion,
//     AccordionBody,
//     AccordionHeader,
//     AccordionItem,
//     Col,
//     Container,
//     Row,
// } from 'react-bootstrap'

// async function getData(): Promise<{
//     matches: Match[]
//     currentRoundNumber: number
// }> {
//     const res = await fetch('http://localhost:3000/api/matches', {
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         cache: 'no-cache',
//     })
//     // The return value is *not* serialized
//     // You can return Date, Map, Set, etc.

//     if (!res.ok) {
//         // This will activate the closest `error.js` Error Boundary
//         throw new Error('Failed to fetch data')
//     }

//     const matches: Match[] = await res.json()
//     const currentRoundNumber = getCurrentRoundNumber(matches)

//     return {
//         matches,
//         currentRoundNumber,
//     }
// }

export function MatchesPage() {
    // const { currentRoundNumber, matches } = await getData()
    const { session } = useRouteContext({ from: '/matches' })

    return (
        <PageWrapper adminOnly={false} session={session}>
            {/* <RoundManagement /> */}
            <h2 className="mt-4">Runden</h2>
            {/* {matches.length === 0 ? (
                <div>Keine Spiele gefunden!</div>
            ) : (
                <Accordion
                    defaultActiveKey={[`${currentRoundNumber}`]}
                    alwaysOpen
                >
                    {Array.from({ length: currentRoundNumber }).map(
                        (_, index) => {
                            const roundNumber = index + 1
                            const matchesOfRound = matches.filter(
                                (match) => match.round === roundNumber,
                            )

                            return (
                                <AccordionItem
                                    eventKey={`${roundNumber}`}
                                    key={`${roundNumber}`}
                                >
                                    <AccordionHeader>
                                        Runde {roundNumber}
                                    </AccordionHeader>
                                    <AccordionBody>
                                        <Container fluid className="px-3">
                                            <Row
                                                xs={1}
                                                lg={2}
                                                xxl={3}
                                                className="g-2"
                                            >
                                                {matchesOfRound.map(
                                                    (match, index) => (
                                                        <Col xs key={match.id}>
                                                            <MatchCard
                                                                match={match}
                                                                displayNumber={
                                                                    index + 1
                                                                }
                                                            />
                                                        </Col>
                                                    ),
                                                )}
                                            </Row>
                                        </Container>
                                    </AccordionBody>
                                </AccordionItem>
                            )
                        },
                    )}
                </Accordion>
            )} */}
        </PageWrapper>
    )
}
