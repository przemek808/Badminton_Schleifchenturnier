import { createRootRoute, createRouter } from '@tanstack/react-router'
import { AppShell } from '../app-shell/app-shell.js'
import { homepageRoute } from '../home/homepage-route.js'
import { resultsPageRoute } from '../results-page/results-page-route.js'
import { playersPageRoute } from '../players-page/players-page-route.js'
import { matchesPageRoute } from '../matches-page/matches-page-route.js'

export const rootRoute = createRootRoute({
    component: AppShell,
})

const routeTree = rootRoute.addChildren([
    homepageRoute,
    resultsPageRoute,
    playersPageRoute,
    matchesPageRoute,
])

export const router = createRouter({ routeTree, defaultPreload: 'intent' })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
