import { Container, Navbar, Nav, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import welcome from '../assets/welcome.png';

const Welcome = () => {
    const history = useHistory();
    const [userAccess, setUserAccess] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setUserAccess(true);
        } else {
            history.push('/auth/signin');
        }
    }, []);

    return ( <>
        {userAccess ? 
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
                                    to="/auth/signout"
                                    bsPrefix="btn"
                                    className="btn btn-primary me-2"
                                >
                                    Sign Out
                                </Nav.Link>
                            </span>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Image 
                src={welcome}
                className="border-dark border w-50 p-5"
                style={{top: "25%", left: "25%", position: "absolute"}}
            />
        </Fragment> :<>Forbidden!!!</> }</>
    )
}

export default Welcome;