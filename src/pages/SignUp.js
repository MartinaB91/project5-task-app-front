import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SignUpForm = () => {
    return (
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password1" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password2">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password2" />
                </Form.Group>
                <Button variant="secondary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default SignUpForm;