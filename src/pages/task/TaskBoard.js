import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MyScoreBoard } from "../family_member/MyScoreBoard";
import { DisplayFamilyMemberTasks } from "../task/Tasks";
import styles from "../../styles/TaskBoard.module.css";
import { ProfileScoreBoard } from "../family_member/ProfileScoreBoard";
import { useCurrentUser, setCurrentUser } from "../../context/CurrentUser";
import MessageUnauthenticatedUser from "../../components/common/MessageUnauthenticatedUser";

const TaskBoard = () => {
    const currentUser = useCurrentUser();
    return (
        <>
            {currentUser == null || currentUser === "" ? (
                <MessageUnauthenticatedUser message="You need to sign in before viewing the taskboard"/>
            ) : (
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

            )}
        </>

    )
};

export default TaskBoard;