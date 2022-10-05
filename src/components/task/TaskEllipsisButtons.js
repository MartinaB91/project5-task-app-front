import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import styles from "../../styles/TaskEllipsisButtons.module.css";
import { useNavigate } from 'react-router-dom';


const EllipsisButton = React.forwardRef(({ onClick }, ref) => (
    <FontAwesomeIcon icon={faEllipsisVertical} className={styles.EllipsisButton}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  ));

  export const EllipsisDropdown = ({ id, title }) => {
    const navigate = useNavigate();

    return (
      <Dropdown>
        <Dropdown.Toggle 
        as={EllipsisButton}
        />
  
        <Dropdown.Menu
        className="text-center"
        >
          <Dropdown.Item
            className={styles.DropdownItem}
            onClick={ () => navigate(`/tasks/${id}/edit`)}
            aria-label="edit"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </Dropdown.Item>
          <Dropdown.Item
            className={styles.DropdownItem}
            onClick={ () => navigate(`/tasks/${id}/${title}/delete`)}
            aria-label="delete"
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };