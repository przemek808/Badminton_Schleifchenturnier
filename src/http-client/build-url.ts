import path from 'path'

export function buildUrl(
    host: string | null,
    endpoint: string,
    id?: string,
): string {
    const urlPath = id ? path.join(endpoint, id) : endpoint

    if (host === null) {
        return urlPath
    }

    return new URL(urlPath, host).toString()
}
