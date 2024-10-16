import { readFile } from 'fs/promises'
import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import path from 'path'
import { createAdaptorServer } from '@hono/node-server'

async function createServer() {
    const clientBundle = await readFile(
        path.resolve(process.cwd(), 'target', 'build', 'bundle-name'),
    ).then((value) => value.toString())

    const app = new Hono()

    app.use(
        `/__bundles/${clientBundle}`,
        serveStatic({
            path: `target/build/client/${clientBundle}`,
        }),
    )

    app.use(
        '/__static/bundle.css',
        serveStatic({
            path: 'target/build/static/css/bootstrap.min.css',
        }),
    )

    app.use(
        '/__static/bundle.js',
        serveStatic({
            path: 'target/build/static/js/react-bootstrap.min.js',
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
                    <script type="module" src="/__static/bundle.js"></script>
                </head>
                <body>
                    <div id="app"></div>
                    <script type="module" src="/__bundles/${clientBundle}"></script>
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
