import 'server-only'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Navigation } from '@components/navigation/navigation'
import { AppWrapper } from '@components/app-wrapper/app-wrapper'

import 'bootstrap/dist/css/bootstrap.min.css'
import { SessionContextProvider } from 'src/context/session-context/session-context'

export const metadata: Metadata = {
    title: 'Badminton Schleifchenturnier',
    description: 'Erstelle und manage ein Badminton Schleifchenturnier',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const sessionCookieValue = cookies().get('session')?.value

    return (
        <AppWrapper>
            <SessionContextProvider sessionCookieValue={sessionCookieValue}>
                <body>
                    <Navigation />
                    {children}
                </body>
            </SessionContextProvider>
        </AppWrapper>
    )
}
