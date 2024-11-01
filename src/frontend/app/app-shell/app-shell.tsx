import { Outlet, useRouteContext } from '@tanstack/react-router'
import { Fragment } from 'react'
import { Navigation } from './navigation/navigation.js'

export function AppShell() {
    const { session, apiClient } = useRouteContext({ from: '__root__' })

    return (
        <Fragment>
            <header>
                <Navigation session={session} apiClient={apiClient} />
            </header>
            <main>
                <Outlet />
            </main>
            <footer />
        </Fragment>
    )
}
