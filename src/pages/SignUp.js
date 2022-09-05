import axios from 'axios';
import styles from '../styles/SignUp.module.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


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

    const handleFormSubmit = async e => {
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
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={onFormFieldUpdate}
                        value={username}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={onFormFieldUpdate}
                        value={email}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
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
        </Container>
    )
}

export default SignUpForm;