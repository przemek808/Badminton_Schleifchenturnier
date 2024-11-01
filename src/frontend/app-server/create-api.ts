import type { Hono } from 'hono'
import { deleteCookie, getSignedCookie, setSignedCookie } from 'hono/cookie'

export function createApi(app: Hono) {
    app.post('api/login', async (context) => {
        const secret = process.env.SESSION_COOKIE_SECRET

        if (secret === undefined) {
            context.status(500)
            return context.text('Missing environment configuration')
        }

        const { username, password } = await context.req.json()

        if (username === undefined || password === undefined) {
            context.status(401)
            return context.text('Missing credentials')
        }

        if (
            username === process.env.ADMIN_USERNAME &&
            password === process.env.ADMIN_PASSWORD
        ) {
            await setSignedCookie(context, 'session', 'admin', secret, {
                secure: true,
                sameSite: 'Strict',
                httpOnly: true,
            })
        }

        context.status(200)
        return context.text('Login successful')
    })

    app.get('api/login', async (context) => {
        const secret = process.env.SESSION_COOKIE_SECRET

        if (secret === undefined) {
            return context.status(500)
        }

        const cookie = await getSignedCookie(context, secret, 'session')

        if (cookie === 'admin') {
            context.status(200)
            return context.json({
                role: 'admin',
            })
        }

        context.status(200)
        return context.json({
            role: 'user',
        })
    })

    app.get('api/logout', async (context) => {
        await deleteCookie(context, 'session', {
            secure: true,
            sameSite: 'Strict',
            httpOnly: true,
        })

        context.status(200)
        return context.text('logout successful')
    })
}
