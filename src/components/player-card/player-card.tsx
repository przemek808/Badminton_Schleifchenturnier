'use client'

import { PlayerForm } from '@components/forms/player-form/player-form'
import { useRouter } from 'next/navigation'
import { FormEvent, Fragment, MouseEvent, useState } from 'react'
import {
    Button,
    Card,
    CardBody,
    CardLink,
    CardSubtitle,
    CardTitle,
    Modal,
} from 'react-bootstrap'
import { useHttpClient } from 'src/hooks/use-http-client'
import { Player } from 'src/http-client/entities/player/player'

type PlayerCardProps = {
    player: Player
}

export function PlayerCard(props: PlayerCardProps) {
    const {
        player: { name, rating, id },
    } = props

    const client = useHttpClient()
    const router = useRouter()

    const [showModal, setShowModal] = useState(false)
    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)

    async function handleDelete(event: MouseEvent<HTMLElement>) {
        event.stopPropagation()

        try {
            await client.players.delete(id.toString())
        } catch {}

        router.refresh()
    }

    return (
        <Fragment>
            <Card>
                <CardBody>
                    <CardTitle>{name}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted">
                        {rating}
                    </CardSubtitle>
                    <Button variant="link" onClick={handleShow}>
                        Bearbeiten
                    </Button>
                    <Button variant="link" onClick={handleDelete}>
                        Löschen
                    </Button>
                </CardBody>
            </Card>
            <Modal show={showModal} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Spieler bearbeiten</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PlayerForm
                        id={id.toString()}
                        name={name}
                        rating={rating.toString()}
                        type="edit"
                    />
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}
