import { Player } from 'src/storage/player/player'

type PlayerCardProps = {
    player: Player
}

export function PlayerCard(props: PlayerCardProps) {
    const {
        player: { name, rating },
    } = props

    return (
        <div>
            <div>{name}</div>
            <div>
                <span>Rating</span>
                <span>{rating}</span>
            </div>
        </div>
    )
}
