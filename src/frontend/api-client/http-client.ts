type HttpClientDependencies = {
    baseUrl: string
    fetchMethod?: typeof fetch
}

export type HttpClient = {
    get(endpoint: string): Promise<unknown>
    post(endpoint: string, body: string): Promise<void>
}

export function createHttpClient(
    dependencies: HttpClientDependencies,
): HttpClient {
    const { baseUrl, fetchMethod = fetch } = dependencies

    function buildUrl(endpoint: string): URL {
        return new URL(endpoint, baseUrl)
    }

    return {
        async get(endpoint) {
            const url = buildUrl(endpoint)

            const response = await fetchMethod(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            return response.json()
        },

        async post(endpoint, body) {
            const url = buildUrl(endpoint)

            await fetchMethod(url, {
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            return
        },
    }
}
