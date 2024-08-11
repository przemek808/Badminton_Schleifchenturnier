'use client'

import { FormEvent, useState } from 'react'
import {
    Button,
    Col,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    FormText,
    Row,
} from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import { useHttpClient } from 'src/hooks/use-http-client'

export function CreatePlayer() {
    const [name, setName] = useState('')
    const [rating, setRating] = useState('')

    const router = useRouter()
    const client = useHttpClient()

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        event.stopPropagation()

        const player = { name, rating: parseInt(rating) }

        await client.players.post(player)

        router.refresh()
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <FormGroup as={Col} controlId="playerName">
                    <FormLabel>Spieler Name</FormLabel>
                    <FormControl
                        type="text"
                        onChange={(event) => {
                            setName(event.target.value)
                        }}
                    />
                    <FormText className="text-muted">
                        Der angegebene Name muss eindeutig sein. 2 Spieler mit
                        dem gleichen Namen sind nicht moeglich.
                    </FormText>
                </FormGroup>

                <FormGroup as={Col} controlId="playerRating">
                    <FormLabel>Spieler Rating</FormLabel>
                    <FormControl
                        type="number"
                        onChange={(event) => {
                            setRating(event.target.value)
                        }}
                    />
                    <FormText className="text-muted">
                        Das Rating ist ein Schaetzwert der Staerke des Spielers.
                    </FormText>
                </FormGroup>
            </Row>

            <Button variant="primary" type="submit" className="mt-3">
                Spieler erstellen
            </Button>
        </Form>
    )
}
