'use client'

import {
    createContext,
    type PropsWithChildren,
    type ReactElement,
    useContext,
} from 'react'
import { z } from 'zod'

const sessionSchema = z.object({
    role: z.union([z.literal('admin'), z.literal('user')]),
})

export type Session = z.infer<typeof sessionSchema>

const defaultSession: Session = {
    role: 'user',
}

const SessionContext = createContext<Session>(defaultSession)

type SessionContextProviderProps = PropsWithChildren & {
    sessionCookieValue: string | undefined
}

export function SessionContextProvider(
    props: SessionContextProviderProps,
): ReactElement {
    const { children, sessionCookieValue } = props

    let session = defaultSession

    if (sessionCookieValue) {
        const parsedSession = sessionSchema.safeParse(
            JSON.parse(sessionCookieValue),
        )
        if (parsedSession.success) {
            session = parsedSession.data
        }
    }

    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    )
}

export function useSession(): Session {
    return useContext(SessionContext)
}
