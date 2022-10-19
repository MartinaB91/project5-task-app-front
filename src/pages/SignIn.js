import { useState, useContext } from 'react';
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
import Image from "react-bootstrap/Image";
import Rabbit from "../assets/images/rabbit-2.webp";
import Alert from 'react-bootstrap/Alert';
import { CurrentFamilyMemberContext } from "../context/CurrentFamilyMemberContext";
import { setTokenTimestamp } from "../utils/utils";


const SignInForm = () => {
    const setCurrentUser = useSetCurrentUser();
    useRedirect('signedIn');

    const [familyMemberContext, setFamilyMemberContext] = useContext(CurrentFamilyMemberContext);

    // Convert json to js object
    const currentFamilyMemberObj = JSON.parse(familyMemberContext);

    const [signInForm, setSignInForm] = useState({
        username: "",
        password: "",
    });
    const { username, password } = signInForm;

    const [errors, setError] = useState({});

    const navigate = useNavigate({});

    const onFormFieldUpdate = (e) => {
        setSignInForm({
            ...signInForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/dj-rest-auth/login/', signInForm)
        .then((response) => {
            setCurrentUser(response.data.user);
            setTokenTimestamp(response.data);
            if (response.status === 200) {
                // If ther is no family member create a empty object, just to not have currentFamilyMember = null. 
                if (currentFamilyMemberObj == null){
                    const empty = {
                      id: null,
                      belongs_to_profile: "",
                      name: "",
                      family_member_img: "",
                      role: "",
                      star_points: "",
                      ongoing_tasks: "",
                      closed_tasks: ""
                    };
                  
                    setFamilyMemberContext(JSON.stringify(empty));

                  }
                  navigate("/taskboard");
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
                    <h1 className={styles.Header}>Sign In</h1>
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
                        {errors.username?.map((message, idx) =>
                        <Alert variant='warning' key={idx}>{message}</Alert>
                        )}
                 
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
                        {errors.password?.map((message, idx) =>
                        <Alert variant='warning' key={idx}>{message}</Alert>
                        )}

                        <Button variant="dark" type="submit" className={styles.SignInButton}>
                            Sign In
                        </Button>
                        {errors.non_field_errors?.map((message, idx) =>
                        <Alert variant='warning' key={idx}>{message}</Alert>
                        )}
                    </Form>
                    <p className={styles.SignUpText}>Don't have an account yet?<Link to="/signup" className={styles.SignUpLink} onClick={SignUpForm}>Sign Up</Link></p>
                </Col>
            </Row>
            <Image className={styles.BackgroundImage} src={Rabbit} alt="Rabbit with party hat" />
        </Container>
    )
}

export default SignInForm;
