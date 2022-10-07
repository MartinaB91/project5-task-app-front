import React, { useContext, useEffect } from 'react';
import { useCurrentUser, setCurrentUser, CurrentUserContext } from "../../context/CurrentUser";
import { useParams } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import styles from "../../styles/ProfileScoreBoard.module.css";
import Test from "../../assets/images/test-sign-in.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import InformationTrigger from "../common/ScoreBoardInformationTrigger";

export const ProfileScoreBoard = () => {
    const currentUser = useCurrentUser();
    const { id } = useParams();

    const [profile, setProfile] = useState({});
    
    const [completedAndOngoingTasks, setCompletedAndOngoingTasks] = useState({
        family_star_leader_name: "No leader yet",
        family_star_leader_points: 0,
        total_completed_tasks: 0,
        total_ongoing_tasks: 0

    });

    const [todoTasks, setTodoTasks] = useState({
        total_todo_tasks: 0,
    });

    const { family_star_leader_name, family_star_leader_points, total_completed_tasks, total_ongoing_tasks} = completedAndOngoingTasks;
    const {total_todo_tasks,} = todoTasks;

    useEffect(() => {
        const handleMount = async () => {
            await axios.get(`profiles/${currentUser["profile_id"]}`)
                .then((response) => {
                    // Set profile to Data
                    setProfile(response["data"]);
                })
                .catch((e) => console.log(e));
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

                setCompletedAndOngoingTasks({"total_completed_tasks":completed, "total_ongoing_tasks":ongoing, "family_star_leader_name": familyMemberWithHighestStarPoints.name, "family_star_leader_points": familyMemberWithHighestStarPoints.star_points});
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
                    if (resp.assigned == null && resp.status == 'Todo') {
                        todo += 1
                    }
                }
                setTodoTasks({"total_todo_tasks": todo});
              })
              .catch((e) => console.log(e));
          };
        
        handleTotalTodoTasks();
        handleScoreBoard();
        handleMount();
    }, [id]);
    
    
    return (
    <>
        <Row className="justify-content-sm-center shadow-sm">
        <span className='mt-2'><InformationTrigger /></span>
        <Col xs={5} sm={3} className="text-center">
            <Image roundedCircle src={Test} className={styles.Image} />
            <h4 className={styles.ScoreBoardTextImage}>
                
                <span>Family star</span>
            </h4>
            <h4>
                <span className={`${styles.FamilyStar} ${styles.FamilyStarName} mb-5`}>{family_star_leader_name}</span>
                <span className={styles.FamilyStarPoints}>{family_star_leader_points}</span> 
            <FontAwesomeIcon icon={faStar} className={styles.FontAwesomeIcon} />
            </h4>
        </Col>
        <Col xs={3} sm={3} className="text-start text-md-center">
            <p className={styles.ScoreBoardNumber}>{total_todo_tasks}</p>
            <h4 className={styles.ScoreBoardText}>To-Do</h4>
        </Col> 
        <Col xs={4} sm={3}>
            <p className={styles.ScoreBoardNumber}>{total_completed_tasks}</p>
            <h4 className={styles.ScoreBoardText}>Completed Tasks</h4>
        </Col>
        <Col className="d-none d-sm-block">
            <p className={styles.ScoreBoardNumber}>{total_ongoing_tasks}</p>
            <h4 className={styles.ScoreBoardText}>Ongoing Tasks</h4>
        </Col>
        </Row>
    </>
    )
}
