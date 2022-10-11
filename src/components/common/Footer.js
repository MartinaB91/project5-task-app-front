import React from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import styles from "../../styles/Footer.module.css";

const Footer = () => {
    return (
        <Container fluid id={styles["footer-container"]}>
            <ul className="nav justify-content-center border-bottom border-dark pb-3 mb-3">
                <li className="px-2 text-muted">
                    <Link className={styles.Link} to="/">Home</Link>
                </li>
                <li className="nav-item px-2 text-muted">
                    <Link className={styles.Link} to="#">Task Board</Link>
                </li>
            </ul>
            <p className="text-center text-muted">© 2022 Martina Björlin</p>
        </Container>
    )
};

export default Footer;