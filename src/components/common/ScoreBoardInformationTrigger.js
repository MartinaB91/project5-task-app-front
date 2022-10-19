import React from 'react';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faUserPlus, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import styles from "../../styles/TaskEllipsisButtons.module.css";


function InformationTrigger() {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="button-tooltip-2">
      <p><span className={styles.TriggerText}>Navbar:</span>In the navbar(username) you can change or add a family member. You can also add new tasks to your scoreboard.</p>
      <p><span className={styles.TriggerText}>Scorebords:</span>On the top scoreboard you find information about what you and your family has completed together. Family star is the family member that has the highest amount of collected star points. On the other scoreboard you find information about your own achievements.</p>
      <p><span className={styles.TriggerText}>Taskboard:</span> On the taskboard you find all tasks. You can mark a task as your by click on the <FontAwesomeIcon icon={faUserPlus} className="mr-1 ml-1" /> button. When you are done with the task your mark it as done by clicking the <FontAwesomeIcon icon={faCircleCheck} className="mr-1 ml-1"/> button.</p>
      </Tooltip>}
    >
      {({ ref, ...triggerHandler }) => (
        <p {...triggerHandler} className="d-inline-flex"><FontAwesomeIcon ref={ref} icon={faInfo} className={styles.InformationIcon}/></p>
      )}
    </OverlayTrigger>
  );
}

export default InformationTrigger;