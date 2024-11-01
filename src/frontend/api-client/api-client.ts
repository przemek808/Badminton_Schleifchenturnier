import type { HttpClient } from './http-client.js'
import { getPlayerClient, type PlayerClient } from './player/player-client.js'
import {
    getSessionClient,
    type SessionClient,
} from './session/session-client.js'

type ApiClientDependencies = {
    httpClient: HttpClient
}

export type ApiClient = {
    session: SessionClient
}

export function createApiClient(
    dependencies: ApiClientDependencies,
): ApiClient {
    const { httpClient } = dependencies

    return {
        session: getSessionClient({ httpClient }),
    }
}
