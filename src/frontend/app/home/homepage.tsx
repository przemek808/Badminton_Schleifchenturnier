import { PageWrapper } from '../common/page-wrapper/page-wrapper.js'

export function Homepage() {
    return (
        <PageWrapper adminOnly={false}>
            <h1>Badminton Schleifchenturnier</h1>
            <h2>Aktuelle Spiele</h2>
            {/* <div>Aktive Runde: {currentRoundNumber}</div>
            {matches.length === 0 ? (
                <div>Keine Spiele gefunden!</div>
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
            )} */}
        </PageWrapper>
    )
}
