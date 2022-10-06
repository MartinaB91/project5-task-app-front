import React from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Tooltip } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import styles from "../../styles/TaskEllipsisButtons.module.css";

function InformationTrigger() {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="button-tooltip-2">Here you find a summary of what your family have completed. Family star is the family member that has the highest amount of collected star points</Tooltip>}
    >
      {({ ref, ...triggerHandler }) => (
        <p {...triggerHandler} className="d-inline-flex"><FontAwesomeIcon ref={ref} icon={faInfo} className={styles.InformationIcon}/></p>
      )}
    </OverlayTrigger>
  );
}

export default InformationTrigger;