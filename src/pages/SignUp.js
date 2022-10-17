import styles from '../styles/SignUp.module.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Image } from 'react-bootstrap';
import Rabbit3 from "../assets/images/rabbit-5.webp";
import { axiosReq } from '../api/axiosDefaults';

const SignUpForm = () => {
    const [signUpForm, setSignUpForm] = useState({
        username: "",
        email: "",
        password1: "",
        password2: "",
    });
    const { username, email, password1, password2 } = signUpForm;

    const [errors, setError] = useState({});

    const navigate = useNavigate();

    const onFormFieldUpdate = (e) => {
        setSignUpForm({
            ...signUpForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        axiosReq.post('/dj-rest-auth/registration/', signUpForm)
        .then((response) => {
            if (response.status === 201) {
                navigate("/signin");
            }
        })
        .catch((e) => {
            console.log(e);
            setError(e.response?.data);
        });
        
      
    };

    return (
        <Container fluid className={styles.Container}>
            <Row>
                <Col xs={12} sm={6} lg={4} className={`${styles.FormWrapper} mx-auto text-start`}>
                <h1 className={styles.Header}>Sign Up</h1>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label >Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                onChange={onFormFieldUpdate}
                                value={username}
                            />
                        </Form.Group>
                        {errors.username?.map((message, idx) =>
                        <Alert variant='warning' key={idx}>{message}</Alert>
                        )}

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
                        {errors.email?.map((message, idx) =>
                        <Alert variant='warning' key={idx}>{message}</Alert>
                        )}

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
                        {errors.password1?.map((message, idx) =>
                        <Alert variant='warning' key={idx}>{message}</Alert>
                        )}

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
                        {errors.password2?.map((message, idx) =>
                        <Alert variant='warning' key={idx}>{message}</Alert>
                        )}

                        <Button className={styles.SignUpButton} variant="dark" type="submit">
                            Sign Up
                        </Button>
                        {errors.non_field_errors?.map((message, idx) =>
                        <Alert variant='warning' key={idx}>{message}</Alert>
                        )}
                    </Form>
                </Col>
            </Row>
            <Image className={styles.BackgroundImage} src={Rabbit3} />
        </Container>
    )
}

export default SignUpForm;