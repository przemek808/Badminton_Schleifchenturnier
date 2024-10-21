// import { Link } from '@tanstack/react-router'
import { type ReactNode } from 'react'
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap'
import { useSession } from '../../shared/session-context/session-context.js'
import { Login } from '../login/login.js'
import { Link } from '@tanstack/react-router'
import { resultsPageRoute } from '../../results-page/results-page-route.js'
import { homepageRoute } from '../../home/homepage-route.js'
import { playersPageRoute } from '../../players-page/players-page-route.js'
import { matchesPageRoute } from '../../matches-page/matches-page-route.js'

export function Navigation(): ReactNode {
    const { role } = useSession()

    return (
        <Navbar expand="md" className="bg-body-tertiary mb-3" collapseOnSelect>
            <Container fluid>
                <Link to={homepageRoute.to} className="navbar-brand">
                    Badminton Schleifchenturnier
                </Link>
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
                            <Login as={Nav.Link} />
                            <Link to={homepageRoute.to} className="nav-link">
                                Home
                            </Link>
                            {role === 'admin' && (
                                <Link
                                    to={playersPageRoute.to}
                                    className="nav-link"
                                >
                                    Players
                                </Link>
                            )}
                            <Link to={matchesPageRoute.to} className="nav-link">
                                Matches
                            </Link>
                            <Link to={resultsPageRoute.to} className="nav-link">
                                Result
                            </Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}
