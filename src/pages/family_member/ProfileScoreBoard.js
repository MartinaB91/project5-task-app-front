import React, { useContext, useEffect } from 'react';
import { useCurrentUser } from "../../context/CurrentUser";
import { useParams } from "react-router-dom";
import { useState } from 'react';
import { CurrentFamilyMemberContext } from "../../context/CurrentFamilyMemberContext";
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import styles from "../../styles/ProfileScoreBoard.module.css";
import Default from "../../assets/images/rabbit-face-1.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export const ProfileScoreBoard = () => {
    const currentUser = useCurrentUser();
    const [familyMemberContext, setFamilyMemberContext] = useContext(CurrentFamilyMemberContext);
    const { id } = useParams();


    const [profile, setProfile] = useState({});

    const [completedAndOngoingTasks, setCompletedAndOngoingTasks] = useState({
        family_star_leader_name: "",
        family_star_leader_points: 0,
        total_completed_tasks: 0,
        total_ongoing_tasks: 0,
        family_star_leader_img: "",

    });

    const [todoTasks, setTodoTasks] = useState({
        total_todo_tasks: 0,
    });

    const { family_star_leader_name, family_star_leader_points, total_completed_tasks, total_ongoing_tasks, family_star_leader_img } = completedAndOngoingTasks;
    const { total_todo_tasks, } = todoTasks;

    useEffect(() => {
        const handleMount = async () => {
            if (currentUser != null) {
                await axios.get(`profiles/${currentUser["profile_id"]}`)
                    .then((response) => {
                        // Set profile to Data
                        setProfile(response["data"]);
                    })
                    .catch((e) => console.log(e));
            }
        };

        const handleScoreBoard = async () => {
            await axios.get("familymembers/members/")
                .then((response) => {
                    console.log(response);

                    let completed = 0;
                    let ongoing = 0;
                    let starPointsArray = [];
                    for (let resp of response.data) {
                        completed += parseInt(resp.closed_tasks);
                        ongoing += parseInt(resp.ongoing_tasks);
                        starPointsArray.push(resp);
                    }
                    // Inspiration from:
                    // https://stackoverflow.com/questions/36941115/return-object-with-highest-value
                    // Finds the the highest star points and then find the object that belongs to the highest score. 
                    // Todo: Handle if family members have the same star points
                    const findHighestStarPoints = Math.max(...starPointsArray.map(x => x.star_points))
                    var familyMemberWithHighestStarPoints = starPointsArray.find(starPointsArray => starPointsArray.star_points === findHighestStarPoints);

                    setCompletedAndOngoingTasks({ "total_completed_tasks": completed, "total_ongoing_tasks": ongoing, "family_star_leader_name": familyMemberWithHighestStarPoints.name, "family_star_leader_points": familyMemberWithHighestStarPoints.star_points, "family_star_leader_img": familyMemberWithHighestStarPoints.family_member_img });
                })
                .catch((e) => console.log(e));
        };

        const handleTotalTodoTasks = async () => {
            await axios.get("taskboard/tasks")
                .then((response) => {
                    console.log(response);

                    // "Convert" json to array
                    let todo = 0;
                    for (let resp of response.data) {
                        if (resp.assigned === null && resp.status == 'Todo') {
                            todo += 1
                        }
                    }
                    setTodoTasks({ "total_todo_tasks": todo });
                })
                .catch((e) => console.log(e));
        };

        handleTotalTodoTasks();
        handleScoreBoard();
        handleMount();
    }, [id, familyMemberContext]);


    return (
        <>
            <Row className="justify-content-sm-center shadow-sm">
                <h2 className={styles.ScoreBoardHeader}>Our ScoreBoard</h2>
                <Col xs={5} sm={3} className="text-center">
                    {family_star_leader_img !== "" ?
                        <Image roundedCircle src={family_star_leader_img} className={styles.Image} />
                        :
                        <Image roundedCircle src={Default} className={styles.Image} />
                    }
                    <h4 className={styles.ScoreBoardTextImage}>

                        <span className={styles.FamilyStarHeader}>Family star</span>
                    </h4>
                    <h4>
                        <span className={`${styles.FamilyStar} ${styles.FamilyStarName} mb-5`}>{family_star_leader_name}</span>
                        <span className={styles.FamilyStarPoints}>{family_star_leader_points}</span>
                        <FontAwesomeIcon icon={faStar} className={styles.FontAwesomeIcon} />
                    </h4>
                </Col>
                <Col xs={3} sm={3} className={`${styles.ToDoTaskWrapper} text-start text-md-center`}>
                    <p className={styles.ScoreBoardNumber}>{total_todo_tasks}</p>
                    <h4 className={styles.ScoreBoardText}>To-Do</h4>
                </Col>
                <Col xs={4} sm={3} className={styles.CompletedTasksWrapper}>
                    <p className={styles.ScoreBoardNumber}>{total_completed_tasks}</p>
                    <h4 className={styles.ScoreBoardText}>Closed</h4>
                </Col>
                <Col className={`${styles.OngoingTaskWrapper} d-none d-sm-block`}>
                    <p className={styles.ScoreBoardNumber}>{total_ongoing_tasks}</p>
                    <h4 className={styles.ScoreBoardText}>Ongoing</h4>
                </Col>
            </Row>
        </>
    )
}
