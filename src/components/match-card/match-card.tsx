import { Match } from '@data/tournament/tournament'
import {
    Card,
    CardBody,
    CardSubtitle,
    CardText,
    CardTitle,
    ListGroup,
    ListGroupItem,
} from 'react-bootstrap'

type MatchCardProps = {
    match: Match
    displayNumber: number
}

export function MatchCard(props: MatchCardProps) {
    const {
        match: { id, round, results, players },
        displayNumber,
    } = props

    return (
        <Card>
            <CardBody>
                <CardTitle>Feld {displayNumber}</CardTitle>
                <CardSubtitle className="mb-2 text-muted">
                    Runde: {round}
                </CardSubtitle>
                {Object.keys(players).map((team) => {
                    return (
                        <ListGroup horizontal="sm" className="my-2">
                            <ListGroupItem>
                                {team === 'team1' ? 'Team 1' : 'Team 2'}
                            </ListGroupItem>
                            {players[team as 'team1' | 'team2'].map(
                                (player) => (
                                    <ListGroupItem>{player.name}</ListGroupItem>
                                ),
                            )}
                        </ListGroup>
                    )
                })}
                <CardText>Ergebnisse: {JSON.stringify(results)}</CardText>
            </CardBody>
        </Card>
    )
}
