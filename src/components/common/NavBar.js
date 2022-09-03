import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/NavBar.module.css";


const NavBar = () => {
    return (
        <Navbar className={styles.NavBar} bg="none" expand="lg" fixed="top">
            <Container fluid>
                <Link to="/" className={styles.Link}>
                    <Navbar.Brand>Family Star<i className="fas fa-star" id={styles["star-icon"]}></i></Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" className="justify-content-end">
                    <Nav>
                        {/* <Navbar.Text>Change family member</Navbar.Text> */}
                        <Link to="/signin" className={styles.Link}>Sign In</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )


};

export default NavBar;