import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faStar, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import React from "react";
import { useState, useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from "../../styles/TaskBoard.module.css";
import { CurrentFamilyMemberContext } from "../../context/CurrentFamilyMemberContext";
import { EllipsisDropdown } from "../../components/task/TaskEllipsisButtons";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import InformationTrigger from "../../components/common/ScoreBoardInformationTrigger";
import Loader from "../../components/common/Loader";
import HiddenRabbit from "../../assets/images/hidden-rabbit.svg";


export const DisplayFamilyMemberTasks = () => {

  const [tasks, setTasks] = useState([]);

  // Todo: Use when assigning by click on user +
  const [familyMemberContext, setFamilyMemberContext] = useContext(CurrentFamilyMemberContext);
  const currentFamilyMemberObj = JSON.parse(familyMemberContext);
  const [familymembersList, setFamilymembersList] = useState([]);
  const [error, setError] = useState({});
  const [query, setQuery] = useState();
  const [filter, setFilter] = useState('no_selected_value');
  const [hasLoaded, setHasLoaded] = useState(false);

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
      if (filter === "no_selected_value" && query === undefined) {
        await axios.get("taskboard/tasks")
          .then((response) => {
            console.log(response);

            // "Convert" json to array
            let tasksAsArray = [];
            for (let resp of response.data) {
              tasksAsArray.push(resp);
            }

            setTasks(tasksAsArray);
            setHasLoaded(true);
          })
          .catch((e) => console.log(e));

      }

    };

    const fetchTasks = async () => {
      if (filter !== "no_selected_value" || query !== undefined) {
        await axios.get(`taskboard/tasks/?filter=${filter}&search=${query}&family_member_id=${currentFamilyMemberObj?.id}`)
          .then((response) => {
            console.log(response);

            // "Convert" json to array
            let tasksAsArray = [];
            for (let resp of response.data) {
              tasksAsArray.push(resp);
            }
            setTasks(tasksAsArray);
            setHasLoaded(true);
          })
          .catch((e) => console.log(e));
      }
    };

    setHasLoaded(false);
    handleMount();
    const timer = setTimeout(() => {
      fetchTasks();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };

  }, [query, filter, currentFamilyMemberObj?.id]);

  const handleAssign = async (e) => {
    e.preventDefault();
    const taskId = e.currentTarget.value;
    axios.patch(`taskboard/tasks/${taskId}/assign`, { "assigned": currentFamilyMemberObj.id })
      .then((response) => {
        // TODO: make the patch return statusCode so we only change state when patch i succesful
        const tasksAsArray = [];
        for (let task of tasks) {
          // Find the task we are updating in the tasks-state/list
          // Warning, one is string one is int. Two equal sign comparsion should be safe. 
          if (task.id == taskId) {
            if (task.assigned == currentFamilyMemberObj.id) {
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
          // Warning, one is string one is int. Two equal sign comparsion should be safe. 
          if (task.id == taskId) {
            task.status === 'Done' ? task.status = 'Todo' : task.status = 'Done';
          }
          tasksAsArray.push(task);
        }
        setTasks(tasksAsArray);

        if (response["data"].status === "Todo") {
          currentFamilyMemberObj.star_points = currentFamilyMemberObj.star_points - response["data"].star_points;
          currentFamilyMemberObj.closed_tasks = currentFamilyMemberObj.closed_tasks - 1;
          currentFamilyMemberObj.ongoing_tasks = currentFamilyMemberObj.ongoing_tasks + 1;
        } else {
          currentFamilyMemberObj.star_points = currentFamilyMemberObj.star_points + response["data"].star_points;
          currentFamilyMemberObj.closed_tasks = currentFamilyMemberObj.closed_tasks + 1;
          currentFamilyMemberObj.ongoing_tasks = currentFamilyMemberObj.ongoing_tasks - 1;
        }

        setFamilyMemberContext(JSON.stringify(currentFamilyMemberObj));
      })
      .catch((e) => console.log(e));
  };

  const searchSection = (
    <Form className="mt-3 mb-4" onSubmit={(event) => event.preventDefault()}>
      <Row className="">
        <Col xs={1} lg={3}><InformationTrigger /></Col>
        <Col xs={7} lg={5}>
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            placeholder="Search tasks by title or description"
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
      { currentFamilyMemberObj !== null && currentFamilyMemberObj.id !== null ? (
        <>
          {hasLoaded ? (
            <>
              {tasks == "" || tasks == [] ? (
                <>
                  <Row className="justify-content-center text-center">
                    <Image className={`${styles.HiddenRabbitLoader} mt-4`} src={HiddenRabbit} alt="hidden rabbit"></Image>
                    <p className="text-center">Oops there is nothing here... </p>
                  </Row>
                </>
              ) : (
                <>
                  <Row className="g-2">
                    {tasks.map((task) => {
                      let family_member = familymembersList.find(x => x.id == task.assigned)
                      return (
                        <Col key={task.id} sm={12} md={6} lg={4}>
                          <Card className="shadow-sm">
                            <Card.Header className={styles.CardTitle}>
                              <Card.Title className="text-start" >
                                <Row>
                                  <Col xs={1} sm={1} md={2} lg={1}>< EllipsisDropdown title={task.title} id={task.id} assigned={task.assigned} /></Col>
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
                                <Col xs={4} md={4}>
                                  {task.assigned === null || task.assigned === "" ?
                                    <Button onClick={handleAssign} value={task.id} className="text-start" variant="link" aria-label="assign button"><FontAwesomeIcon icon={faUserPlus} className={`${styles.userPlus} fa-2x btn`} /></Button>
                                    :
                                    <>

                                      {/* Warning, one is string one is int. Two equal sign comparsion should be safe. */}
                                      {task.assigned == currentFamilyMemberObj?.id && task.status == "Todo" ?

                                        <>
                                          <button onClick={handleAssign} value={task.id} className={styles.AssignButton} aria-label="unassign button"><Image roundedCircle src={family_member.family_member_img} className={styles.Image} aria-label="family member image unassigned" /></button>
                                          <p className={styles.AssignedName}>{family_member.name}</p>
                                        </>
                                        :
                                        <>
                                          <button disabled value={task.id} className={styles.AssignButton} aria-label="unassign disabled button"><Image roundedCircle src={family_member.family_member_img} className={styles.Image} aria-label="family member image unassigned disabled" /></button>
                                          <p className={styles.AssignedName}>{family_member.name}</p>
                                        </>
                                      }
                                    </>

                                  }
                                </Col>
                                <Col xs={4} md={4}>
                                  <Card.Text className={`${styles.cardCategory} text-start mt-4`}>{task.category_name}</Card.Text>
                                </Col>
                                <Col xs={4} md={4} className={styles.AssignButtonWrapper}>
                                  {/* If task status is todo but the task is not assigned the done btn will be
                    disabled. When btn is assigned you can mark the task as done */}
                                  {task.status === "Todo" ?
                                    <>
                                      {task.assigned == null || task.assigned == "" || task.assigned !== currentFamilyMemberObj?.id ?
                                        <Button disabled variant="link" onClick={handleTaskDone} value={task.id} className="text-end btn" aria-label="done button disabled"><FontAwesomeIcon icon={faCircleCheck} size="lg" className={`${styles.checkMark} fa-2x btn`} /></Button>
                                        :
                                        <Button variant="link" onClick={handleTaskDone} value={task.id} className="text-end btn" aria-label="done button"><FontAwesomeIcon icon={faCircleCheck} size="lg" className={`${styles.checkMark} fa-2x btn`} /></Button>}
                                    </>
                                    : // Task is done 
                                    <>
                                      {task.assigned === currentFamilyMemberObj?.id ?
                                        <Button variant="link" onClick={handleTaskDone} value={task.id} className="text-end" aria-label="undo done button"><FontAwesomeIcon icon={faCircleCheck} size="lg" className={`${styles.checkMarkDone} fa-2x text-end btn`} /></Button>
                                        :
                                        <Button disabled variant="link" onClick={handleTaskDone} value={task.id} className="text-end" aria-label="undo done button"><FontAwesomeIcon icon={faCircleCheck} size="lg" className={`${styles.checkMarkDone} fa-2x text-end btn`} /></Button>}
                                    </>
                                  }

                                </Col>
                              </Row>
                            </Card.Body>
                          </Card>
                        </Col>
                      )
                    })}

                  </Row>
                </>)}
            </>
          ) : (
            <>
              <Row>
                <Loader spinner message="Loading" />
              </Row>
            </>)}
        </>
       ) : (
        <p className="text-center mt-4"> Choose a family member before filtering or searching tasks</p>
      )} 
    </>
  );
};

