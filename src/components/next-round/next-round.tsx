'use client'

import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

async function generateNextRound() {
    const res = await fetch('/api/generate-next-round', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache',
    })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
}

export function NextRound(): ReactNode {
    const router = useRouter()

    const handleClick = async () => {
        await generateNextRound()

        router.refresh()
    }

    return <button onClick={handleClick}>Naechste Runde generieren</button>
}
