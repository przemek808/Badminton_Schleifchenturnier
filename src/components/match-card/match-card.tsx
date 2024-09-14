'use client'

import { Match, resultSchema } from '@data/match/match'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import {
    Button,
    Card,
    CardBody,
    CardSubtitle,
    CardTitle,
    Form,
    FormControl,
    InputGroup,
    ListGroup,
    ListGroupItem,
    Table,
} from 'react-bootstrap'
import InputGroupText from 'react-bootstrap/esm/InputGroupText'
import { useSession } from 'src/context/session-context/session-context'
import { TrashIcon } from 'src/icons/trash-icon'

async function updateMatch(id: number, matchUpdate: Partial<Match>) {
    const res = await fetch(`/api/matches/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(matchUpdate),
    })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
}

type MatchCardProps = {
    match: Match
    displayNumber: number
}

export function MatchCard(props: MatchCardProps) {
    const {
        match: { id, round, results, players },
        displayNumber,
    } = props

    const router = useRouter()
    const { role } = useSession()

    const handleResultInput = useCallback(
        async (data: unknown) => {
            const newResult = resultSchema.parse(data)

            await updateMatch(id, { results: [...results, newResult] })
            router.refresh()
        },
        [id, results, router],
    )

    const handleResultDeletion = useCallback(
        async (index: number) => {
            results.splice(index, 1)

            await updateMatch(id, { results })
            router.refresh()
        },
        [id, results, router],
    )

    return (
        <Card>
            <CardBody>
                <CardTitle>Feld {displayNumber}</CardTitle>
                <CardSubtitle className="mb-2 text-muted">
                    Runde: {round}
                </CardSubtitle>
                {Object.keys(players).map((team) => {
                    return (
                        <ListGroup horizontal="sm" className="my-2" key={team}>
                            <ListGroupItem>
                                {team === 'team1' ? 'Team 1' : 'Team 2'}
                            </ListGroupItem>
                            {players[team as 'team1' | 'team2'].map(
                                (player) => (
                                    <ListGroupItem key={player.name}>
                                        {player.name}
                                    </ListGroupItem>
                                ),
                            )}
                        </ListGroup>
                    )
                })}
                <Table>
                    <thead>
                        <tr>
                            <th>Satz</th>
                            <th>Team 1</th>
                            <th>Team 2</th>
                            {role === 'admin' ? <th></th> : null}
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => (
                            <tr key={`result_${index}`}>
                                <th>{index + 1}</th>
                                <th>{result.team1}</th>
                                <th>{result.team2}</th>
                                {role === 'admin' ? (
                                    <th>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() =>
                                                handleResultDeletion(index)
                                            }
                                        >
                                            <TrashIcon
                                                height="15px"
                                                width="15px"
                                            />
                                        </Button>
                                    </th>
                                ) : null}
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {role === 'admin' ? (
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault()
                            e.stopPropagation()

                            const { team1, team2 } = e.currentTarget

                            handleResultInput({
                                team1: team1.value,
                                team2: team2.value,
                            })
                        }}
                    >
                        <InputGroup className="mb-3">
                            <InputGroupText>Satz</InputGroupText>
                            <FormControl aria-label="Team 1" name="team1" />
                            <FormControl aria-label="Team 2" name="team2" />
                            <Button
                                variant="outline-secondary"
                                id="button-addon2"
                                type="submit"
                            >
                                Speichern
                            </Button>
                        </InputGroup>
                    </Form>
                ) : null}
            </CardBody>
        </Card>
    )
}
