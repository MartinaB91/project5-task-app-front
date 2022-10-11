import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MyScoreBoard } from "../family_member/MyScoreBoard";
import { DisplayFamilyMemberTasks } from "../task/Tasks";
import { Form } from "react-bootstrap";
import styles from "../../styles/TaskBoard.module.css";
import { ProfileScoreBoard } from "../family_member/ProfileScoreBoard";
import { axiosReq } from "../../api/axiosDefaults";

const TaskBoard = () => {
    return (
        <Container className={styles.Container}>
            <Row>
                <Col lg={12} id={styles["family-member-score-board"]} className="mb-2 mb-md-3">
                    <ProfileScoreBoard />
                </Col>
            </Row>
            <Row>
            <Col className="flex-start" id={styles["todo-tasks-wrapper"]} xs={{ span: 12, order: 2 }} md={{ span: 10, order: 1 }}>
                <DisplayFamilyMemberTasks />
                </Col>
                <Col className="flex-start" id={styles["my-score-board"]} xs={{ span: 12, order: 1 }} md={{ span: 2, order: 2 }}>
                    <MyScoreBoard />
                </Col>
            </Row>
        </Container>
    )
};

export default TaskBoard;