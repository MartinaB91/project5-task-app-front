import React from "react";
import axios from 'axios';
import { Navbar, NavDropdown, Container, Nav, Alert, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/NavBar.module.css";
import {
    useCurrentUser,
    useSetCurrentUser,
} from "../../context/CurrentUser";
import SignInForm from "../../pages/SignIn";
import { DisplayFamilyMember } from "../common/DisplayFamilyMember";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faStar, faCirclePlus } from '@fortawesome/free-solid-svg-icons'


const NavBar = () => {
    const getCurrentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const handleSignOut = async () => {
        try {
            await axios.post("/dj-rest-auth/logout/");

            setCurrentUser(null);
        } catch (err) {
            alert(err);
            console.log(err);
        }
    };

    const buttonForSignedInUser = (
        <>
            <Link to="/taskboard" className={styles.Link}>Task Board</Link>
            <Dropdown align="end">
                <Dropdown.Toggle variant="link">
                    <FontAwesomeIcon icon={faUser} />
                </Dropdown.Toggle>
                <Dropdown.Menu className={`${styles.Menu}`} >
                    <Dropdown.Item ><DisplayFamilyMember /></Dropdown.Item>
                    <Dropdown.Item >
                        <Link to="/addtask" className={styles.Link}>Add Task <FontAwesomeIcon icon={faCirclePlus} /></Link>
                    </Dropdown.Item>
                    <Dropdown.Item >
                        <Link to="/" className={styles.Link} onClick={handleSignOut}>Sign Out</Link>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

        </>
    );

    const buttonForNotSignedInUser = (
        <Link to="/signin" className={styles.Link} onClick={SignInForm}>Sign In</Link>
    );

    return (
        <Navbar className={styles.NavBar}fixed="top">
            <Container fluid>
                <Link to="/" className={styles.Link}>
                    <Navbar.Brand className={styles.Headers}>Family Star
                        <FontAwesomeIcon icon={faStar} id={styles["star-icon"]} /></Navbar.Brand>
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