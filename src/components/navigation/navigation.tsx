'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap'
import Link from 'next/link'

export function Navigation(): ReactNode {
    const pathname = usePathname()

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
                            <Nav.Link href="/player" as={Link}>
                                Players
                            </Nav.Link>
                            <Nav.Link href="/match" as={Link}>
                                Matches
                            </Nav.Link>
                            <Nav.Link href="/importer" as={Link}>
                                Importer
                            </Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}
