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

type EditPlayerProps = {
    id: string
    name: string
    rating: string
    type: 'edit'
}

type CreatePlayerProps = {
    type: 'create'
}

type PlayerFromProps = EditPlayerProps | CreatePlayerProps

export function PlayerForm(props: PlayerFromProps) {
    const { type } = props

    const playerName = type === 'edit' ? props.name : ''
    const playerRating = type === 'edit' ? props.rating : ''

    const [name, setName] = useState(playerName)
    const [rating, setRating] = useState(playerRating)

    const router = useRouter()
    const client = useHttpClient()

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        event.stopPropagation()

        const player = { name, rating: parseInt(rating, 10) }

        if (type === 'edit') {
            await client.players.patch(props.id, {
                name,
                rating: parseInt(rating, 10),
            })
        } else {
            await client.players.post(player)

            setName('')
            setRating('')
        }

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
                        value={name}
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
                        value={rating}
                    />
                    <FormText className="text-muted">
                        Das Rating ist ein Schaetzwert der Staerke des Spielers.
                    </FormText>
                </FormGroup>
            </Row>

            <Button variant="primary" type="submit" className="mt-3">
                {type === 'edit' ? 'Übernehmen' : 'Spieler erstellen'}
            </Button>
        </Form>
    )
}
