import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../router/router.js'
import { MatchesPage } from './matches-page.js'

export const matchesPageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/matches',
    component: MatchesPage,
})
