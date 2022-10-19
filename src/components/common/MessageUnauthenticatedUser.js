import React from 'react';
import RabbitFace from "../../assets/images/rabbit-face-1.svg";
import styles from "../../styles/MessageUnauthenticatedUser.module.css";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const MessageUnauthenticatedUser = ({ message }) => {
    return (
        <Container className={styles.Container}>
            <Row className="d-md-block justify-content-center">
                <Image src={RabbitFace} className={`${styles.RabbitFace} mt-3`} />
                <p className={"text-center"}>{message}</p>
            </Row>
        </Container>
    )
}

export default MessageUnauthenticatedUser



