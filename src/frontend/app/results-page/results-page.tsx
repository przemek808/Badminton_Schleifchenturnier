// import { PlayerResult } from '@app/api/generate-report/route'
// import { PageWrapper } from '@components/page-wrapper/page-wrapper'
import { Table } from 'react-bootstrap'
import { PageWrapper } from '../common/page-wrapper/page-wrapper.js'
import { useRouteContext } from '@tanstack/react-router'

// async function generateReport(): Promise<PlayerResult[]> {
//     const res = await fetch('http://localhost:3000/api/generate-report', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         cache: 'no-cache',
//     })
//     // The return value is *not* serialized
//     // You can return Date, Map, Set, etc.

//     if (!res.ok) {
//         // This will activate the closest `error.js` Error Boundary
//         throw new Error('Failed to fetch data')
//     }

//     return await res.json()
// }

export function ResultsPage() {
    // const report = await generateReport()
    const { session } = useRouteContext({ from: '/results' })

    return (
        <PageWrapper adminOnly={false} session={session}>
            <h1>Aktuelle Ergebnisübersicht</h1>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Sätze</th>
                        <th>Punkte</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {report.map((result, index) => {
                        return (
                            <tr key={result.player.id}>
                                <td>{index + 1}</td>
                                <td>{result.player.name}</td>
                                <td>
                                    {result.wonSets} : {result.lostSets}
                                </td>
                                <td>
                                    {result.wonPoints} : {result.lostPoints}
                                </td>
                            </tr>
                        )
                    })} */}
                </tbody>
            </Table>
        </PageWrapper>
    )
}
