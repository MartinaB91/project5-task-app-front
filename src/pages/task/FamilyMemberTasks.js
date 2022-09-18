import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";


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
    <div>
      <h1>Task</h1>
      {tasks.map((task) => {
        return (
          <div key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <span>Star Points{task.star_points}</span>
            <span>End date:{task.end_date}</span>


          </div>
        )
      })}
    </div>
  )
}

