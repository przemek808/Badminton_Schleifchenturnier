import { Fragment, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import type { Session } from '../../../api-client/session/session.js'
import { useNavigate } from '@tanstack/react-router'
import type { ApiClient } from '../../../api-client/api-client.js'

type LoginProps = {
    as?: React.ElementType
    session: Session | null
    apiClient: ApiClient
}

export function Login(props: LoginProps) {
    const { as: LoginElement = Button, session, apiClient } = props

    const [showModal, setShowModal] = useState(false)
    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        event.stopPropagation()

        try {
            await apiClient.session.login(username, password)
        } catch {}

        handleClose()
        navigate({ to: '/' })
    }

    const handleLogout = async () => {
        try {
            await apiClient.session.logout()
        } catch {}

        navigate({ to: '/' })
    }

    return session?.role === 'admin' ? (
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
