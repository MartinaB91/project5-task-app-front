import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MyScoreBoard } from "../../components/family_member/MyScoreBoard";
import styles from "../../styles/TaskBoard.module.css";

const TaskBoard = () => {
    return (
        <Container>
            <h1>Task Board</h1>
            <Row>
                <Col lg={12} id={styles["family-member-score-board"]}>
                    <h2>Family members score board</h2>
                </Col>
            </Row>
            <Row>
            <Col id={styles["tasks-wrapper"]} xs={{ span: 12, order: 2 }} md={{ span: 10, order: 1 }}>
                    <h2>Tasks</h2>
                </Col>
                <Col id={styles["my-score-board"]} xs={{ span: 12, order: 1 }} md={{ span: 2, order: 2 }}>
                    <MyScoreBoard  />
                </Col>
            </Row>
            <Row>
             
            </Row>
        </Container>
    )
};

export default TaskBoard;