import React from "react";
import { Navbar, Container, Nav} from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Link to="/">
                    <Navbar.Brand href="#">Family Star <i className="fas fa-star"></i></Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" className="justify-content-end">
                    <Nav>
                        {/* <Navbar.Text>Change family member</Navbar.Text> */}
                        <Link to="/signin">Sign In</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )


};

export default NavBar;