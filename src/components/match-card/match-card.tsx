import { Match } from '@data/tournament/tournament'
import {
    Card,
    CardBody,
    CardSubtitle,
    CardText,
    CardTitle,
} from 'react-bootstrap'

type MatchCardProps = {
    match: Match
}

export function MatchCard(props: MatchCardProps) {
    const {
        match: { id, round, results, players },
    } = props

    return (
        <Card>
            <CardBody>
                <CardTitle>{id}</CardTitle>
                <CardSubtitle className="mb-2 text-muted">
                    Runde: {round}
                </CardSubtitle>
                <CardText>Spieler: {JSON.stringify(players)}</CardText>
                <CardText>Ergebnisse: {JSON.stringify(results)}</CardText>
            </CardBody>
        </Card>
    )
}
