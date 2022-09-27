import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MyScoreBoard } from "../../components/family_member/MyScoreBoard";
import { DisplayFamilyMemberTasks } from "../task/FamilyMemberTasks";
import styles from "../../styles/TaskBoard.module.css";
import { FamilyMemberScoreBoard } from "../../components/family_member/FamilyMemberScoreBoard";


const TaskBoard = () => {

    return (
        <Container className={styles.Container}>
            <h1>Task Board</h1>
            <Row>
                <Col lg={12} id={styles["family-member-score-board"]}>
                    <FamilyMemberScoreBoard />
                </Col>
            </Row>
            <Row>
            <Col className="flex-start" id={styles["todo-tasks-wrapper"]} xs={{ span: 12, order: 2 }} md={{ span: 10, order: 1 }}>
                <h2>Search section</h2>
                </Col>
                <Col className="flex-start" id={styles["my-score-board"]} xs={{ span: 12, order: 1 }} md={{ span: 2, order: 2 }}>
                    <MyScoreBoard  />
                </Col>
            </Row>
            <Row>
                <Col id={styles["tasks-wrapper"]} xs={{ span: 12}} md={{ span: 10}}>
                    <DisplayFamilyMemberTasks />
                </Col>
            </Row>
        </Container>
    )
};

export default TaskBoard;