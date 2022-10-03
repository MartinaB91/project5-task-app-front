import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faStar, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { Col, Card, Button, Row } from "react-bootstrap";
import styles from "../../styles/TaskBoard.module.css";
import { CurrentFamilyMemberContext } from "../../context/CurrentFamilyMemberContext";
import { EllipsisDropdown } from "../../components/task/TaskEllipsisButtons";
import Image from "react-bootstrap/Image";
import Test from "../../assets/images/test-sign-in.jpg";


export const DisplayFamilyMemberTasks = () => {

  const [tasks, setTasks] = useState([])

  // Todo: Use when assigning by click on user +
  const [familyMemberContext, setFamilyMemberContext] = useContext(CurrentFamilyMemberContext);
  const currentFamilyMemberObj = JSON.parse(familyMemberContext);
  const [familymembersList, setFamilymembersList] = useState([]);
  const [error, setError] = useState({});
  const [familymemberName, setFamilymemberName] = useState([]);

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

  const handleAssign = async (e) => {
    e.preventDefault();
    const taskId = e.currentTarget.value;
    axios.patch(`taskboard/tasks/${taskId}/assign`, { "assigned": currentFamilyMemberObj.id })
      .then((response) => {
        // TODO: make the patch return statusCode so we only change state when patch i succesful
        const tasksAsArray = [];
        for (let task of tasks) {
          // Find the task we are updating in the tasks-state/list
          if (task.id == taskId) {
            //task.assigned === currentFamilyMemberObj.id ? task.assigned = null : task.assigned = currentFamilyMemberObj.id;
            if (task.assigned === currentFamilyMemberObj.id) {
              task.assigned = null;
              currentFamilyMemberObj.ongoing_tasks = currentFamilyMemberObj.ongoing_tasks - 1;
              
            } else {
              task.assigned = currentFamilyMemberObj.id;
              currentFamilyMemberObj.ongoing_tasks = currentFamilyMemberObj.ongoing_tasks + 1;
            }
          }
          tasksAsArray.push(task);
        }
        setTasks(tasksAsArray);
        setFamilyMemberContext(JSON.stringify(currentFamilyMemberObj));

        

      })
      .catch((e) => console.log(e));
  };

  const handleTaskDone = async (e) => {
    e.preventDefault();

      const taskId = e.currentTarget.value;
      axios.patch(`taskboard/tasks/${taskId}/done`, { "status": "Done" }) 
      .then((response) => {
        const tasksAsArray = [];
        for (let task of tasks) {
          // Find the task we are updating in the tasks-state/list
          if (task.id == taskId) {
            task.status === 'Done' ? task.status = 'Todo' : task.status = 'Done';
          }
          tasksAsArray.push(task);
        }
        setTasks(tasksAsArray);

        if (response["data"].status == "Todo"){
          currentFamilyMemberObj.star_points = currentFamilyMemberObj.star_points - response["data"].star_points;
          currentFamilyMemberObj.closed_tasks = currentFamilyMemberObj.closed_tasks - 1;
        } else{
          currentFamilyMemberObj.star_points = currentFamilyMemberObj.star_points + response["data"].star_points;
          currentFamilyMemberObj.closed_tasks = currentFamilyMemberObj.closed_tasks + 1;
        }
  
        setFamilyMemberContext(JSON.stringify(currentFamilyMemberObj));
        
      })
      .catch((e) => console.log(e));
    };

  return (
    <Row className="g-2">
      {tasks.map((task) => {
        return (
          <Col key={task.id} sm={12} md={6} lg={4}>
            <Card>
              <Card.Header className={styles.CardTitle}>
                <Card.Title className="text-start" >
                  <Row>
                    <Col xs={1} sm={1} md={2} lg={1}>< EllipsisDropdown title={task.title} id={task.id} /></Col>
                    <Col xs={8} sm={8} md={6} lg={7} className={`${styles.Button} ${styles.taskTitle} text-center`}>{task.title}</Col>
                    <Col xs={3} sm={3} md={4} lg={4} className={`${styles.Button} text-end`}>{task.star_points}<FontAwesomeIcon className={styles.FontAwesomeIcon} icon={faStar} /></Col>
                  </Row>
                </Card.Title>
              </Card.Header>
              <Card.Body className={styles.CardBody}>
                <Card.Text className={`${styles.endDate} text-end`}>
                  Done: {task.end_date}
                </Card.Text>
                <Card.Text>
                  {task.description}
                </Card.Text>
                <Row>
                  <Col xs={2} md={2}>
                    {task.assigned === null || task.assigned === "" ?
                      <Button onClick={handleAssign} value={task.id} className="text-start" variant="link"><FontAwesomeIcon icon={faUserPlus} className={`${styles.userPlus} fa-2x`} /></Button>
                      :
                      <>
                      <button onClick={handleAssign} value={task.id} className={styles.AssignButton}><Image roundedCircle src={Test} className={styles.Image} /></button>
                      <p>{}</p>
                      </>
                      }

                  </Col>
                  <Col xs={7} md={7}>
                    <Card.Text className="text-center mt-3">{task.category_name}</Card.Text>
                  </Col>
                  <Col xs={3} md={3}>
                    {task.status === "Todo" ?
                      <Button variant="link" onClick={handleTaskDone} value={task.id} className="text-end"><FontAwesomeIcon icon={faCircleCheck} size="lg" className={`${styles.checkMark} fa-2x`} /></Button>
                      : <Button variant="link" onClick={handleTaskDone} value={task.id} className="text-end"><FontAwesomeIcon icon={faCircleCheck} size="lg" className={`${styles.checkMarkDone} fa-2x text-end`} /></Button>}

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

