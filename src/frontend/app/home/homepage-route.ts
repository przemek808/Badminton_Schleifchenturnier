import { createRoute } from '@tanstack/react-router'
import { Homepage } from './homepage.js'
import { rootRoute } from '../router/router.js'

export const homepageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Homepage,
})
