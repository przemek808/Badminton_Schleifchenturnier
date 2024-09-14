import 'server-only'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
    const credentials = await request.json()

    if (
        credentials.username === process.env.ADMIN_USERNAME &&
        credentials.password === process.env.ADMIN_PASSWORD
    ) {
        cookies().set('session', JSON.stringify({ role: 'admin' }), {
            maxAge: 60 * 60 * 24,
            sameSite: 'strict',
        })
        return new Response('Authorized', { status: 200 })
    } else {
        return new Response('Unauthorized', { status: 401 })
    }
}
