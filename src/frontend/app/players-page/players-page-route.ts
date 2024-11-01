import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../router/router.js'
import { PlayersPage } from './players-page.js'

export const playersPageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/players',
    component: PlayersPage,
})
