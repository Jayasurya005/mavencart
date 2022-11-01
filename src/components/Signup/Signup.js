import { Fragment, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import AxiosInstance from "../../api/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
    const history = useHistory();
    const axiosInstance = AxiosInstance();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        const error = validateFields();
        if (!Object.keys(error).length) {
            setLoading(true);
            const payload = {
                email,
                username,
                password
            };
            await axiosInstance.post('/api/signup', payload).then(res => {
                toast.success('Users Registered Successfully');
                setLoading(false);
                history.push('/auth/signin');
            }).catch(err => {
                setLoading(false);
                toast.error('Please Try Again');
            })
        } else {
            setError(error);
        }
    }

    const validateFields = () => {
        const validationError = {};
        if (password !== confirmPassword) {
            validationError.pwdError = 'Password does not match'
        }
        if (!email) {
            validationError.email = 'Email field is required';
        }
        if (!username) {
            validationError.username = 'Username field is required';
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
            <Row className="align-items-center justify-content-center g-0 min-vh-100">
                <Col lg={5} md={5} className="py-8 py-xl-0">
                    <Card>
                        <Card.Body className="p-5">
                            <div className="mb-4">
                                <h2 className="mb-1 fw-bold">Register User</h2>
                                <span>
                                    Already have an account?{" "}
                                    <Link to="/auth/signin" className="ms-1">
                                        Sign in
                                    </Link>
                                </span>
                                <Form className="mt-4">
                                    <Row>
                                        <Col lg={12} md={12} className="mb-3">
                                            {/* User Name */}
                                            <Form.Label>User Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="username"
                                                placeholder="User Name"
                                                value={username}
                                                onChange={handleUsername}
                                                required
                                            />
                                        </Col>
                                        {error?.username ?
                                            <>
                                                <Col lg={12} md={12} className="mb-3">
                                                    <p className='text-danger'>{error.username}</p>
                                                </Col>
                                            </> : null}
                                        <Col lg={12} md={12} className="mb-3">
                                            {/* email */}
                                            <Form.Label>Email </Form.Label>
                                            <Form.Control
                                                type="email"
                                                id="email"
                                                placeholder="Email address here"
                                                value={email}
                                                onChange={handleEmail}
                                                required
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
                                                value={password}
                                                onChange={handlePassword}
                                                required
                                            />
                                        </Col>
                                        {error?.password ?
                                            <>
                                                <Col lg={12} md={12} className="mb-3">
                                                    <p className='text-danger'>{error.password}</p>
                                                </Col>
                                            </> : null}
                                        <Col lg={12} md={12} className="mb-3">
                                            {/* Password */}
                                            <Form.Label>Confirm Password </Form.Label>
                                            <Form.Control
                                                type="password"
                                                id="confirmpassword"
                                                placeholder="**************"
                                                value={confirmPassword}
                                                onChange={handleConfirmPassword}
                                                required
                                            />
                                        </Col>
                                        {error?.pwdError ?
                                            <>
                                                <Col lg={12} md={12} className="mb-3">
                                                    <p className='text-danger'>{error.pwdError}</p>
                                                </Col>
                                            </> : null}
                                        <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                                            {/* Button */}
                                            <Button variant="primary" type="button" onClick={handleSubmit}>
                                                {loading ?
                                                <Spinner
                                                    className="mx-auto me-2"
                                                    animation="border"
                                                    variant="white"
                                                    role="loading"
                                                    size="sm"
                                                /> : <></>}
                                                Sign up
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                                <hr className="my-4" />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Toaster />
        </Fragment>
    )
}

export default Signup;