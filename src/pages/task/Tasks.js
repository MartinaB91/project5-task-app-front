import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faStar, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { Col, Card, Button, Row } from "react-bootstrap";
import styles from "../../styles/TaskBoard.module.css";
import { CurrentFamilyMemberContext } from "../../context/CurrentFamilyMemberContext";
import { EllipsisDropdown } from "../../components/task/TaskEllipsisButtons";
import Image from "react-bootstrap/Image";
import Test from "../../assets/images/test-sign-in.jpg";
import { Form } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";


export const DisplayFamilyMemberTasks = () => {

  const [tasks, setTasks] = useState([])

  // Todo: Use when assigning by click on user +
  const [familyMemberContext, setFamilyMemberContext] = useContext(CurrentFamilyMemberContext);
  const currentFamilyMemberObj = JSON.parse(familyMemberContext);
  const [familymembersList, setFamilymembersList] = useState([]);
  const [error, setError] = useState({});
  const [query, setQuery] = useState();
  const [filter, setFilter] = useState('no_selected_value');

  useEffect(() => {
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
    handleFamilyMembersList();
  }, []);

  useEffect(() => {
    const handleMount = async () => {
      if (filter == "no_selected_value" && query == undefined) {
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
      }

    };

    const fetchTasks = async () => {
      if (filter !== "no_selected_value" || query !== undefined) {
        await axios.get(`taskboard/tasks/?filter=${filter}&search=${query}&family_member_id=${currentFamilyMemberObj.id}`)
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
      }
    }

    handleMount();
    const timer = setTimeout(() => {
      fetchTasks();
    }, 1000)

    return () => {
      clearTimeout(timer);
    };

  }, [query, filter, currentFamilyMemberObj.id]);

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

        if (response["data"].status == "Todo") { 
          currentFamilyMemberObj.star_points = currentFamilyMemberObj.star_points - response["data"].star_points;
          currentFamilyMemberObj.closed_tasks = currentFamilyMemberObj.closed_tasks - 1;
          currentFamilyMemberObj.ongoing_tasks = currentFamilyMemberObj.ongoing_tasks + 1; 
        } else {
          currentFamilyMemberObj.star_points = currentFamilyMemberObj.star_points + response["data"].star_points;
          currentFamilyMemberObj.closed_tasks = currentFamilyMemberObj.closed_tasks + 1;
          currentFamilyMemberObj.ongoing_tasks = currentFamilyMemberObj.ongoing_tasks -1;
        }

        setFamilyMemberContext(JSON.stringify(currentFamilyMemberObj));

      })
      .catch((e) => console.log(e));
  };

  const searchSection = (
    <Form className="mt-3 mb-4" onSubmit={(event) => event.preventDefault()}>
      <Row className="justify-content-center">
        <Col xs={8} lg={5}>
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            placeholder="Search for tasks"
          ></Form.Control>
        </Col>

        <Col xs={4} lg={2}>
          <Form.Select
            aria-label="Select a task filter"
            onChange={(event) => setFilter(event.target.value)}
            value={filter}
          >
            <option value="todo">Todo</option>
            <option value="my_tasks">My tasks</option>
            <option value="assigned">Assigned</option>
            <option value="done">Done</option>
            <option value="all_tasks">All</option>
          </Form.Select>
        </Col>
      </Row>
    </Form>

  )

  return (
    <>
      <Row> {searchSection}</Row>
      <Row className="g-2">
        {tasks.map((task) => {
          return (
            <Col key={task.id} sm={12} md={6} lg={4}>
              <Card className="shadow-sm">
                <Card.Header className={styles.CardTitle}>
                  <Card.Title className="text-start" >
                    <Row>
                      <Col xs={1} sm={1} md={2} lg={1}>< EllipsisDropdown title={task.title} id={task.id} /></Col>
                      <Col xs={8} sm={8} md={6} lg={7} className={`${styles.Button} ${styles.taskTitle} text-center`}>{task.title}</Col>
                      <Col xs={3} sm={3} md={4} lg={4} className={`${styles.Button} text-end`}>{task.star_points}<FontAwesomeIcon className={`${styles.FontAwesomeIcon}`} icon={faStar} /></Col>
                    </Row>
                  </Card.Title>
                </Card.Header>
                <Card.Body className={styles.CardBody}>
                  <Card.Text className={`${styles.endDate} text-end`}>
                    Done: {task.end_date}
                  </Card.Text>
                  <Card.Text className="text-center">
                    {task.description}
                  </Card.Text>
                  <Row className={styles.DoneAndAssignBtnsWrapper}>
                    <Col xs={2} md={2}>
                      {task.assigned === null || task.assigned === "" ?
                        <Button onClick={handleAssign} value={task.id} className="text-start" variant="link"><FontAwesomeIcon icon={faUserPlus} className={`${styles.userPlus} fa-2x btn`} /></Button>
                        :
                        <>
                          <button onClick={handleAssign} value={task.id} className={styles.AssignButton}><Image roundedCircle src={Test} className={styles.Image} /></button>
                          <p>{ }</p>
                        </>
                      }
                    </Col>
                    <Col xs={7} md={7}>
                      <Card.Text className={`${styles.cardCategory} text-center mt-3`}>{task.category_name}</Card.Text>
                    </Col>
                    <Col xs={3} md={3}>
                      {/* If task status is todo but the task is not assigned the done btn will be
                      disabled. When btn is assigned you can mark the task as done */}
                      {task.status === "Todo" ?
                        <>
                          {task.assigned === null || task.assigned === "" ?
                            <Button disabled variant="link" onClick={handleTaskDone} value={task.id} className="text-end btn"><FontAwesomeIcon icon={faCircleCheck} size="lg" className={`${styles.checkMark} fa-2x btn`} /></Button>
                            :
                            <Button variant="link" onClick={handleTaskDone} value={task.id} className="text-end btn"><FontAwesomeIcon icon={faCircleCheck} size="lg" className={`${styles.checkMark} fa-2x btn`} /></Button>}
                        </>
                        : <Button variant="link" onClick={handleTaskDone} value={task.id} className="text-end"><FontAwesomeIcon icon={faCircleCheck} size="lg" className={`${styles.checkMarkDone} fa-2x text-end btn`} /></Button>}

                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    </>
  )
}

