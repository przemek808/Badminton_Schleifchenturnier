import type { HttpClient } from '../http-client.js'
import { sessionSchema, type Session } from './session.js'

type SessionClientDependencies = {
    httpClient: HttpClient
}

export type SessionClient = {
    get(): Promise<Session>
    login(username: string, password: string): Promise<void>
    logout(): Promise<void>
}

export function getSessionClient(
    dependencies: SessionClientDependencies,
): SessionClient {
    const { httpClient } = dependencies

    return {
        async get() {
            const data = await httpClient.get('api/login')

            return sessionSchema.parse(data)
        },
        login(username, password) {
            return httpClient.post(
                'api/login',
                JSON.stringify({ username, password }),
            )
        },
        async logout() {
            await httpClient.get('api/logout')
            return
        },
    }
}
