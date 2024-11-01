import type { PropsWithChildren, ReactElement } from 'react'
import type { Session } from '../../../api-client/session/session.js'

type PageWrapperProps = PropsWithChildren & {
    adminOnly: boolean
    session: Session | null
}

export function PageWrapper(props: PageWrapperProps): ReactElement {
    const { adminOnly, children, session } = props

    const showPage =
        adminOnly === false || (adminOnly === true && session?.role === 'admin')

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
