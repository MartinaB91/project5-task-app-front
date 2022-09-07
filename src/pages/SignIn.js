import { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { Link, useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import SignUpForm from "./SignUp";

import { useSetCurrentUser } from "../context/CurrentUser";
import { useRedirect } from "../hooks/useRedirect";
import styles from "../styles/SignIn.module.css";


const SignInForm = () => {
    const setCurrentUser = useSetCurrentUser();
    useRedirect('signedIn');

    const [signInForm, setSignInForm] = useState({
        username: "",
        password: "",
    });
    const { username, password } = signInForm;

    const [error, setError] = useState({});

    const navigate = useNavigate({});

    const onFormFieldUpdate = (e) => {
        setSignInForm({
            ...signInForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/dj-rest-auth/login/', signInForm);
            setCurrentUser(data.user);
            navigate("/taskboard");
        } catch (error) {
            console.log(error);  // TODO: Remove before prod
            setError(error.response?.data);
        }
    };

    return (
        <Container className={styles.Container}>
            <h2>Sign Up</h2>
            <Form onSubmit={handleFormSubmit}>
                <Row>
                    <Col xs={12} md={10} lg={6} className="mx-auto text-start">
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            name="username"
                            onChange={onFormFieldUpdate}
                            value={username}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            onChange={onFormFieldUpdate}
                            value={password}
                        />
                    </Form.Group>

                    <Button variant="secondary" type="submit">
                        Sign In
                    </Button>
                    </Col>
                </Row>
            </Form>
            <Link to="/signup" onClick={SignUpForm}>Sign Up</Link>
        </Container>
    )
}

export default SignInForm;
