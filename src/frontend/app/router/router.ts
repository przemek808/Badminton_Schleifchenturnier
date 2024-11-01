import {
    createRootRouteWithContext,
    createRouter,
} from '@tanstack/react-router'
import { AppShell } from '../app-shell/app-shell.js'
import { homepageRoute } from '../home/homepage-route.js'
import { resultsPageRoute } from '../results-page/results-page-route.js'
import { playersPageRoute } from '../players-page/players-page-route.js'
import { matchesPageRoute } from '../matches-page/matches-page-route.js'
import { createApiClient, type ApiClient } from '../../api-client/api-client.js'
import { createHttpClient } from '../../api-client/http-client.js'
import type { Session } from '../../api-client/session/session.js'

type RouterContext = {
    apiClient: ApiClient
    session: Session | null
}

export const createApplicationRootRoute =
    createRootRouteWithContext<RouterContext>()

export const rootRoute = createApplicationRootRoute<RouterContext>({
    component: AppShell,
    async beforeLoad(ctx) {
        return {
            session: await ctx.context.apiClient.session.get(),
        }
    },
})

const routeTree = rootRoute.addChildren([
    homepageRoute,
    resultsPageRoute,
    playersPageRoute,
    matchesPageRoute,
])

const httpClient = createHttpClient({ baseUrl: 'http://localhost:3000' })

export const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    context: {
        apiClient: createApiClient({ httpClient }),
        session: null,
    },
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
