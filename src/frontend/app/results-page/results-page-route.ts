import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../router/router.js'
import { ResultsPage } from './results-page.js'

export const resultsPageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/results',
    component: ResultsPage,
})
