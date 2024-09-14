'use client'

import { PropsWithChildren, ReactElement } from 'react'
import { useSession } from 'src/context/session-context/session-context'

type PageWrapperProps = PropsWithChildren & {
    adminOnly: boolean
}

export function PageWrapper(props: PageWrapperProps): ReactElement {
    const { adminOnly, children } = props

    const { role } = useSession()

    const showPage =
        adminOnly === false || (adminOnly === true && role === 'admin')

    return (
        <main className="px-3">
            {showPage ? (
                children
            ) : (
                <div>
                    <h1>Access denied</h1>
                    <p>You are not allowed to access this page</p>
                </div>
            )}
        </main>
    )
}
