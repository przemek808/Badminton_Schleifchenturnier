import { EntityClient, getEntityClient } from './entity-client'
import {
    Player,
    PlayerMutationPayload,
    playerSchema,
} from './entities/player/player'

export type HttpClient = {
    players: EntityClient<Player, PlayerMutationPayload>
}

type HttpClientDependencies = {
    fetch: typeof fetch
    host: string
}

export function getHttpClient(
    dependencies: HttpClientDependencies,
): HttpClient {
    return {
        players: getEntityClient({
            ...dependencies,
            endpoint: '/api/players',
            entitySchema: playerSchema,
        }),
    }
}
