import { PlayerEntity, playerEntity } from './player/player-entity'
import {
    TournamentEntity,
    tournamentEntity,
} from './tournament/tournament-entity'

type Storage = {
    player: PlayerEntity
    tournament: TournamentEntity
}

export const storage: Storage = {
    player: playerEntity,
    tournament: tournamentEntity,
}
