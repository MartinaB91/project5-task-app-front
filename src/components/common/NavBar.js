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
import { faStar, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { removeTokenTimestamp } from "../../utils/utils";


const NavBar = () => {
    const getCurrentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await axiosReq.post("/dj-rest-auth/logout/");
            // Remove session storage and set current user to null
            sessionStorage.removeItem('currentFamilyMember')
            removeTokenTimestamp();
            setCurrentUser(null);
            navigate("/")
        } catch (err) {
            alert(err);
            console.log(err);
        }
    };

    const buttonForSignedInUser = (
        <>

            <Dropdown align="end" className={styles.Test}>
                <Dropdown.Toggle variant="link" className={styles.Link}>
                    {getCurrentUser?.username}
                </Dropdown.Toggle>
                <Dropdown.Menu className={`${styles.Menu} p-3 mt-2`} >
                    <Dropdown.Item><DisplayFamilyMember /></Dropdown.Item>
                    <Dropdown.Item href="/addtask" className={styles.Link}>
                        Add Task <FontAwesomeIcon icon={faCirclePlus} className={styles.AddTaskIcon} />
                    </Dropdown.Item>
                    <Dropdown.Item href="/taskboard" className={`${styles.Link} pt-2`}>Task Board</Dropdown.Item>
                    <Dropdown.Item href="/" className={styles.Link} onClick={handleSignOut}>Sign Out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

        </>
    );

    const buttonForNotSignedInUser = (
        <Link to="/signin" className={`${styles.Link} p-3`} onClick={SignInForm}>Sign In</Link>
    );

    return (
        <Navbar className={styles.NavBar} fixed="top">
            <Container fluid className={styles.Container}>
                <Link to="/" className={styles.Link}>
                    <Navbar.Brand className={`${styles.Headers} p-3`}>Family Star
                        <FontAwesomeIcon icon={faStar} id={styles["star-icon"]} /></Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" className="justify-content-end">
                    <Nav>
                        {getCurrentUser ? buttonForSignedInUser : buttonForNotSignedInUser}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )


};

export default NavBar;