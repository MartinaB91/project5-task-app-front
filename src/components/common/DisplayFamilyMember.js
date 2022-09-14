import { Image } from 'react-bootstrap';
import axios from 'axios';
import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/DisplayFamilyMember.module.css"
import Dropdown from 'react-bootstrap/esm/Dropdown';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

export const DisplayFamilyMember = () => {

  const [familymembers, setFamilymembers] = useState([])

  const handleFamilyMembers = async () => {
    await axios.get("/familymembers/")
      .then((response) => {
        console.log(response);

        // "Convert" json to array
        let responseAsArray = [];
        for (let resp of response.data) {
          responseAsArray.push(resp);
        }

        setFamilymembers(responseAsArray);
      })
      .catch((e) => console.log(e));
  };

  // Only call once per "lifecycle", only run once. 
  useEffect(() => {
    handleFamilyMembers();

  }, []);

  return (
    <>
      <Row>
        <Col>
          {familymembers.map((familymember) => {
            return (
              <Dropdown.Item href="#" key={familymember.name}>{familymember.name}</Dropdown.Item>
            )
          })}
          <Link to="/addfamilymember" className={styles.Link}>Add Family Member<FontAwesomeIcon icon={faUserPlus} /></Link>
        </Col>
      </Row>
    </>
  )
}
