import { getHttpClient } from '../http-client/http-client'

export function useHttpClient() {
    return getHttpClient({
        fetch,
        host: null,
    })
}
