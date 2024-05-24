import type { Metadata } from 'next'
import { Navigation } from '@components/navigation/navigation'
import { AppWrapper } from '@components/app-wrapper/app-wrapper'

import 'bootstrap/dist/css/bootstrap.min.css'

export const metadata: Metadata = {
    title: 'Badminton Schleifchenturnier',
    description: 'Erstelle und manage ein Badminton Schleifchenturnier',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <AppWrapper>
            <body>
                <Navigation />
                {children}
            </body>
        </AppWrapper>
    )
}
