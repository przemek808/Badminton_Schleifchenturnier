'use client'

import { useEffect, useState } from 'react'

export function AppWrapper({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('dark')

    useEffect(() => {
        window?.matchMedia('(prefers-color-scheme: dark)')?.matches
            ? setColorScheme('dark')
            : setColorScheme('light')
    }, [])

    return (
        <html lang="en" data-bs-theme={colorScheme}>
            {children}
        </html>
    )
}
