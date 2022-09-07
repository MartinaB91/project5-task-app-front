import axios from 'axios';
import styles from '../styles/SignUp.module.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const SignUpForm = () => {
    const [signUpForm, setSignUpForm] = useState({
        username: "",
        email: "",
        password1: "",
        password2: "",
    });
    const { username, email, password1, password2 } = signUpForm;

    const [error, setError] = useState({});

    const navigate = useNavigate();

    const onFormFieldUpdate = (e) => {
        setSignUpForm({
            ...signUpForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            axios.post('/dj-rest-auth/registration/', signUpForm);
            navigate("/signin");
        } catch (error) {
            setError(error.response?.data);
        }
    };

    return (
        <Container className={styles.Container}>
            <h2>Sign Up</h2>
            <Row>
                <Col xs={12} md={10} lg={6} className="mx-auto text-start">
                    <Form onSubmit={handleFormSubmit}>
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

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                onChange={onFormFieldUpdate}
                                value={email}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                name="password1"
                                onChange={onFormFieldUpdate}
                                value={password1}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="confirmPassword">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                name="password2"
                                onChange={onFormFieldUpdate}
                                value={password2}
                            />
                        </Form.Group>
                        <Button variant="secondary" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default SignUpForm;