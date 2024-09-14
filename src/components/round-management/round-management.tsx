'use client'

import { NextRound } from '@components/next-round/next-round'
import { Fragment } from 'react'
import { useSession } from 'src/context/session-context/session-context'

export function RoundManagement() {
    const { role } = useSession()

    return role === 'admin' ? (
        <Fragment>
            <h2>Rundenmanagement</h2>
            <NextRound />
        </Fragment>
    ) : null
}
