import 'server-only'
import { cookies } from 'next/headers'

export async function GET() {
    cookies().delete('session')
    return new Response('Logged Out', { status: 200 })
}
