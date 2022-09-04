import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/NavBar.module.css";
import {
    useCurrentUser,
    useSetCurrentUser,
  } from "../../context/CurrentUser";


const NavBar = () => {
    const getCurrentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();


    const buttonForSignedInUser = (
        <Link to="/signout" className={styles.Link}>Sign Out</Link>
        );

    const buttonForNotSignedInUser = (
        <Link to="/signin" className={styles.Link}>Sign In</Link>
    );

    return (
        <Navbar className={styles.NavBar} bg="none" expand="lg" fixed="top">
            <Container fluid>
                <Link to="/" className={styles.Link}>
                    <Navbar.Brand>Family Star<i className="fas fa-star" id={styles["star-icon"]}></i></Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" className="justify-content-end">
                    <Nav>
                        {getCurrentUser ? buttonForSignedInUser : buttonForNotSignedInUser}
                        {/* <Navbar.Text>Change family member</Navbar.Text> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )


};

export default NavBar;