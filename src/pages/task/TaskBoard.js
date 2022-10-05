import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MyScoreBoard } from "../../components/family_member/MyScoreBoard";
import { DisplayFamilyMemberTasks } from "../task/FamilyMemberTasks";
import { Form } from "react-bootstrap";
import styles from "../../styles/TaskBoard.module.css";
import { ProfileScoreBoard } from "../../components/family_member/ProfileScoreBoard";
import { axiosReq } from "../../api/axiosDefaults";



const TaskBoard = () => {

    const [query, setQuery] = useState();

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const { data } = await axiosReq.get(`taskboard/tasks/?search=${query}`);
          } catch (err) {
            console.log(err);
          }
        };
        const timer = setTimeout(() => {
            
        }, 1000)
        fetchPosts();
    
      }, [query]);

    return (
        <Container className={styles.Container}>
            <Row>
                <Col lg={12} id={styles["family-member-score-board"]} className="mb-2 mb-md-3">
                    <ProfileScoreBoard />
                </Col>
            </Row>
            <Row>
            <Col className="flex-start" id={styles["todo-tasks-wrapper"]} xs={{ span: 12, order: 2 }} md={{ span: 10, order: 1 }}>
                    <Form className={styles.SearchForm} onSubmit={(event) => event.preventDefault()}>
                        <Form.Control 
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        type="text" 
                        placeholder="Search for tasks"
                        ></Form.Control>

                    </Form>
                <DisplayFamilyMemberTasks />
                </Col>
                <Col className="flex-start" id={styles["my-score-board"]} xs={{ span: 12, order: 1 }} md={{ span: 2, order: 2 }}>
                    <MyScoreBoard  />
                </Col>
            </Row>
        </Container>
    )
};

export default TaskBoard;