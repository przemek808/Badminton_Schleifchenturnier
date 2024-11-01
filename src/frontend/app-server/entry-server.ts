import { readFile } from 'fs/promises'
import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import path from 'path'
import { createAdaptorServer } from '@hono/node-server'
import { createApi } from './create-api.js'

async function createServer() {
    const clientBundle = await readFile(
        path.resolve(process.cwd(), 'target', 'build', 'bundle-name'),
    ).then((value) => value.toString())

    const app = new Hono()
    createApi(app)

    app.use(
        `/__static/${clientBundle}`,
        serveStatic({
            path: `target/build/client/${clientBundle}`,
        }),
    )

    app.use(
        '/__static/bundle.css',
        serveStatic({
            path: 'target/build/bootstrap/bootstrap.min.css',
        }),
    )

    app.get('*', (context) => {
        console.log('Server got request', { url: context.req.url })
        return context.html(`<!doctype html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Badminton Schleifchenturnier</title>
                    <link rel="stylesheet" href="/__static/bundle.css"/>
                </head>
                <body>
                    <div id="app"></div>
                    <script type="module" src="/__static/${clientBundle}"></script>
                </body>
            </html>
        `)
    })

    const server = createAdaptorServer({ fetch: app.fetch })

    server.listen('3000', () => {
        console.log('Server started at http://localhost:3000')
    })
}

createServer()
