import {
    Card,
    CardBody,
    CardLink,
    CardSubtitle,
    CardTitle,
} from 'react-bootstrap'
import { Player } from 'src/http-client/entities/player/player'

type PlayerCardProps = {
    player: Player
}

export function PlayerCard(props: PlayerCardProps) {
    const {
        player: { name, rating },
    } = props

    return (
        <Card>
            <CardBody>
                <CardTitle>{name}</CardTitle>
                <CardSubtitle className="mb-2 text-muted">
                    {rating}
                </CardSubtitle>
                <CardLink>Bearbeiten</CardLink>
                <CardLink>Löschen</CardLink>
            </CardBody>
        </Card>
    )
}
