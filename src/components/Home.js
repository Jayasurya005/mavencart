import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';

const Home = () => {
    return (
        <Fragment>
            <Navbar className="navbar-default p-2 py-2" bg='light' expand="lg" variant='light'>
                <Container fluid>
                    <Navbar.Brand href="/">User Authentication</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">
                            <span
                                className={`ms-auto mt-3 mt-lg-0 `}
                            >
                                <Nav.Link
                                    as={Link}
                                    to="/auth/signin"
                                    bsPrefix="btn"
                                    className="btn btn-white shadow-sm me-2"
                                >
                                    Sign In
                                </Nav.Link>
                                <Nav.Link
                                    as={Link}
                                    to="/auth/signup"
                                    bsPrefix="btn"
                                    className="btn btn-primary shadow-sm"
                                >
                                    Sign Up
                                </Nav.Link>
                            </span>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
}

export default Home;