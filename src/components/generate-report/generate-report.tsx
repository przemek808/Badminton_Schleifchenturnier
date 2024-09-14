'use client'

import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

async function generateReport() {
    const res = await fetch('http://localhost:3000/api/generate-report', {
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

    return await res.json()
}

export function GenerateReport(): ReactNode {
    const router = useRouter()

    const handleClick = async () => {
        const report = await generateReport()

        console.log(report)

        router.refresh()
    }

    return <button onClick={handleClick}>Auswertung erstellen</button>
}
