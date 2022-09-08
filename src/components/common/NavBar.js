import React from "react";
import axios from 'axios';
import { Navbar, Container, Nav, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/NavBar.module.css";
import {
    useCurrentUser,
    useSetCurrentUser,
  } from "../../context/CurrentUser";
import SignInForm from "../../pages/SignIn";


const NavBar = () => {
    const getCurrentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const handleSignOut = async () => {
        try {
        await axios.post("/dj-rest-auth/logout/");
        //   .then(res => {
        //     localStorage.removeItem('user');
        //     localStorage.removeItem('username');
        //     localStorage.removeItem('expirationDate');
        //     localStorage.removeItem('token');
        // })

          setCurrentUser(null);
        } catch (err) {
            alert(err);
          console.log(err);
        }
      };

    const buttonForSignedInUser = (
        <>
        <Link to="/taskboard" className={styles.Link}>Task Board</Link>
        <Link to="/" className={styles.Link} onClick={handleSignOut}>Sign Out</Link>
        </>
        );

    const buttonForNotSignedInUser = (
        <Link to="/signin" className={styles.Link} onClick={SignInForm}>Sign In</Link>
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