import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserPlus, faEllipsisVertical, faStar} from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Col, Card, Button, Row } from "react-bootstrap";
import styles from "../../styles/TaskBoard.module.css";



export const DisplayFamilyMemberTasks = () => {

  const [tasks, setTasks] = useState([])

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
    handleMount();
  }, []);


  return (
    <Row>
      <h2>To-Do</h2>
      {tasks.map((task) => {
        return (
          <Col key={task.id} sm={12} md={6} lg={4}>
            <Card>
              <Card.Header>
              <Button className="text-start"><FontAwesomeIcon icon={faEllipsisVertical} /></Button>
                <h4>{task.title} {task.star_points}<FontAwesomeIcon className={styles.FontAwesomeIcon} icon={faStar} />
                </h4> 
                </Card.Header>
              <Card.Body>
                <Card.Text>
                  {task.description}
                </Card.Text>
                <Card.Text>
                  {task.category_name}
                </Card.Text>
                <Card.Text>
                  {task.end_date}
                </Card.Text>
                <Button className="text-start"><FontAwesomeIcon icon={faUserPlus} /></Button>
              </Card.Body>
            </Card>
          </Col>






          // 
          //   <h3>{task.title}</h3>
          //   <span>Star Points{task.star_points}</span>
          //   <span>End date:{task.end_date}</span>
          //   <p>{task.description}</p>
          //   <p>{task.category_name}</p>
          // <
        )
      })}
    </Row>
  )
}

