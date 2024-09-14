'use client'

import { useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useSession } from 'src/context/session-context/session-context'

type LoginProps = {
    as?: React.ElementType
}

export function Login(props: LoginProps) {
    const { as: LoginElement = Button } = props
    const { role } = useSession()

    const [showModal, setShowModal] = useState(false)
    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)

    const router = useRouter()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        event.stopPropagation()

        try {
            await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                cache: 'no-cache',
            })
        } catch {}

        handleClose()
        router.refresh()
    }

    const handleLogout = async () => {
        try {
            await fetch('/api/logout', {
                cache: 'no-cache',
            })
        } catch {}

        router.refresh()
    }

    return role === 'admin' ? (
        <LoginElement variant="link" onClick={handleLogout}>
            Logout
        </LoginElement>
    ) : (
        <Fragment>
            <LoginElement variant="link" onClick={handleShow}>
                Login
            </LoginElement>
            <Modal show={showModal} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="username">
                            <Form.Label>Benutzername</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Benutzername"
                                onChange={(event) => {
                                    setUsername(event.target.value)
                                }}
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(event) => {
                                    setPassword(event.target.value)
                                }}
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="mt-3"
                        >
                            Einloggen
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}
