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
import FormImage from "../assets/images/test-sign-in.jpg";
import { Image } from "react-bootstrap";
import Rabbit from "../assets/images/rabbit-2.webp";



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
        <Container fluid className={styles.Container}>
            <Row>
                <Col xs={12} sm={6} lg={4} className={`${styles.FormWrapper} mx-auto text-start`}>
                    <h1 className={styles.Header}>Sign In</h1>
                    <Form onSubmit={handleFormSubmit}>

                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label className={styles.Label}>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                onChange={onFormFieldUpdate}
                                value={username}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label className={styles.Label}>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                onChange={onFormFieldUpdate}
                                value={password}
                            />
                        </Form.Group>

                        <Button variant="dark" type="submit">
                            Sign In
                        </Button>
                    </Form>
                    <p className={styles.SignUpText}>Don't have an account yet?<Link to="/signup" className={styles.SignUpLink} onClick={SignUpForm}>Sign Up</Link></p>
                </Col>
            </Row>
            <Image className={styles.BackgroundImage} src={Rabbit} />
        </Container>
    )
}

export default SignInForm;
