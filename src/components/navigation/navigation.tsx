'use client'

import { ReactNode } from 'react'
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap'
import Link from 'next/link'
import { useSession } from 'src/context/session-context/session-context'

export function Navigation(): ReactNode {
    const { role } = useSession()

    return (
        <Navbar expand="md" className="bg-body-tertiary mb-3">
            <Container fluid>
                <Navbar.Brand as={Link} href="/">
                    Badminton Schleifchenturnier
                </Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-md`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                            Links
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="/" as={Link}>
                                Home
                            </Nav.Link>
                            {role === 'admin' && (
                                <Nav.Link href="/player" as={Link}>
                                    Players
                                </Nav.Link>
                            )}
                            <Nav.Link href="/match" as={Link}>
                                Matches
                            </Nav.Link>
                            <Nav.Link href="/result" as={Link}>
                                Result
                            </Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}
