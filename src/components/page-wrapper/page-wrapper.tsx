import { PropsWithChildren, ReactElement } from 'react'

export function PageWrapper(props: PropsWithChildren): ReactElement {
    const { children } = props

    return <main className="px-3">{children}</main>
}
