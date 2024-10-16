import { Outlet } from '@tanstack/react-router'
import { Fragment } from 'react'
import { Navigation } from './navigation/navigation.js'

export function AppShell() {
    return (
        <Fragment>
            <header>
                <Navigation />
            </header>
            <main>
                <Outlet />
            </main>
            <footer />
        </Fragment>
    )
}
