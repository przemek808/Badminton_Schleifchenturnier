import path from 'path'

export function buildUrl(host: string, endpoint: string, id?: string): URL {
    const urlPath = id ? path.join(endpoint, id) : endpoint
    return new URL(urlPath, host)
}
