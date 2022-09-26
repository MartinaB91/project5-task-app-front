import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserPlus, faEllipsisVertical, faStar, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { Col, Card, Button, Row } from "react-bootstrap";
import styles from "../../styles/TaskBoard.module.css";
import { CurrentFamilyMemberContext } from "../../context/CurrentFamilyMemberContext";
import { EllipsisDropdown } from "../../components/common/task/EllipsisButton";



export const DisplayFamilyMemberTasks = () => {

  const [tasks, setTasks] = useState([])
 
  // Todo: Use when assigning by click on user +
  const [familyMemberContext] = useContext(CurrentFamilyMemberContext);
  const currentFamilyMemberObj = JSON.parse(familyMemberContext);
  const [familymembersList, setFamilymembersList] = useState([]);


  useEffect(() => {
    const handleMount = async () => {
      await axios.get("taskboard/tasks")
        .then((response) => {
          console.log(response);

          // "Convert" json to array
          let tasksAsArray = [];
          for (let resp of response.data) {
            tasksAsArray.push(resp);
          }

          setTasks(tasksAsArray);
        })
        .catch((e) => console.log(e));

    };

    
  const handleFamilyMembersList = async () => {
    await axios.get("familymembers/members/")
      .then((response) => {
        console.log(response);

        // "Convert" json to array
        let responseAsArray = [];
        for (let resp of response.data) {
          responseAsArray.push(resp);
        }

        setFamilymembersList(responseAsArray);
      })
      .catch((e) => console.log(e));
  };

    handleMount();
    handleFamilyMembersList();
  }, []);

  const handleAssignment = () => {
    alert(currentFamilyMemberObj);
  }

  // Return the name of the person that is asssigned a task. 
  const getFamilyMemberNameById = (familymemberId) => {
    for (const familymember of familymembersList) {
      if (familymember.id === familymemberId) {
        return familymember.name;
      }
    } 
  }

  const notAssignedTask = (
    <Button className="text-start" variant="link"><FontAwesomeIcon icon={faUserPlus} className={`${styles.userPlus} fa-2x`}/></Button>
  )

  return (
    <Row className="g-1">
      <h2>To-Do</h2>
      {tasks.map((task) => {
        return (
          <Col key={task.id} sm={12} md={6} lg={4}>
            <Card>
              <Card.Header>
                <Card.Title className="text-start" >
                  <Row>
                    <Col xs={1} sm={1} md={2} lg={1}>< EllipsisDropdown/></Col>
                    <Col xs={8} sm={8} md={6} lg={7} className={`${styles.Button} ${styles.taskTitle} text-center`}>{task.title}</Col>
                    <Col xs={3} sm={3} md={4} lg={3} className={`${styles.Button} text-end`}>{task.star_points}<FontAwesomeIcon className={styles.FontAwesomeIcon} icon={faStar}/></Col>
                  </Row>
                </Card.Title> 
                </Card.Header>
              <Card.Body>
              <Card.Text className={`${styles.endDate} text-end`}>
                  Done: {task.end_date}
                </Card.Text>
                <Card.Text>
                  {task.description}
                </Card.Text>
                <Row>
                  <Col xs={2} md={2}>
                    {task.assigned === null || task.assigned === ""  ? notAssignedTask :  getFamilyMemberNameById(task.assigned)}
                  
                  </Col>
                  <Col xs={7}md={7}>
                    <Card.Text className="text-start">{task.category_name}</Card.Text>
                  </Col>
                  <Col xs={3} md={3}>
                    <Button variant="link" className="text-end"><FontAwesomeIcon icon={ faCircleCheck } size="lg" className={`${styles.checkMark} fa-2x`}  /></Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}

