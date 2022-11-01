import { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card, Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import AxiosInstance from '../../api/axiosInstance';
import toast, { Toaster } from 'react-hot-toast';

const Signin = () => {
    const history = useHistory();
    const axiosInstance = AxiosInstance();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        const error = validateFields();
        if (!Object.keys(error).length) {
            setLoading(true);
            await axiosInstance.post('/api/signin', { email, password }).then(res => {
                localStorage.setItem('accessToken', res.data.message);
                setLoading(false);
                history.push('/welcome');
            }).catch(err => {
                toast.error('Please Try Again');
            })
        } else {
            setError(error);
        }
        setLoading(false);
    }

    const validateFields = () => {
        const validationError = {};
        if (!email) {
            validationError.email = 'Email field is required';
        }
        if (!password) {
            validationError.password = 'Password is required';
        }
        if (email) {
            const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (regex.test(email) === false) {
                validationError.email = "Email address is not valid";
            }
        }
        return validationError;
    }


    return (
        <Fragment>
            <Row className="align-items-center justify-content-center min-vh-100">
                <Col lg={5} md={5} className="py-8 py-xl-0">
                    <Card>
                        <Card.Body className="p-5">
                            <div className="mb-4">
                                <h1 className="mb-1 fw-bold">Sign in</h1>
                                <span>
                                    Don’t have an account?{' '}
                                    <Link to="/auth/signup" className="ms-1">
                                        Sign up
                                    </Link>
                                </span>
                            </div>
                            {/* Form */}
                            <Form>
                                <Row>
                                    <Col lg={12} md={12} className="mb-3">
                                        {/* Username or email */}
                                        <Form.Label>Email </Form.Label>
                                        <Form.Control
                                            type="email"
                                            id="email"
                                            placeholder="Email address here"
                                            required
                                            value={email}
                                            onChange={handleEmail}
                                        />
                                    </Col>
                                    {error?.email ?
                                        <>
                                            <Col lg={12} md={12} className="mb-3">
                                                <p className='text-danger'>{error.email}</p>
                                            </Col>
                                        </> : null}
                                    <Col lg={12} md={12} className="mb-3">
                                        {/* Password */}
                                        <Form.Label>Password </Form.Label>
                                        <Form.Control
                                            type="password"
                                            id="password"
                                            placeholder="**************"
                                            required
                                            value={password}
                                            onChange={handlePassword}
                                        />
                                    </Col>
                                    {error?.password ?
                                        <>
                                            <Col lg={12} md={12} className="mb-3">
                                                <p className='text-danger'>{error.password}</p>
                                            </Col>
                                        </> : null}
                                    <Col lg={12} md={12} className="mb-3">
                                        {/* Checkbox */}
                                        <div className="d-md-flex justify-content-between align-items-center">
                                            <Form.Group
                                                className="mb-3 mb-md-0"
                                                controlId="formBasicCheckbox"
                                            >
                                                <Form.Check type="checkbox" label="Remember me" />
                                            </Form.Group>
                                        </div>
                                    </Col>
                                    <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                                        {/* Button */}
                                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                                            {loading ?
                                                <Spinner
                                                    className="mx-auto me-2"
                                                    animation="border"
                                                    variant="white"
                                                    role="loading"
                                                    size="sm"
                                                /> : <></>}
                                            Sign in
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                            <hr className="my-4" />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Toaster />
        </Fragment>
    );

}

export default Signin;