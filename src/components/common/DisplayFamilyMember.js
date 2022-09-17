import axios from 'axios';
import { Row, Col, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/DisplayFamilyMember.module.css"
import Dropdown from 'react-bootstrap/esm/Dropdown';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { CurrentFamilyMemberContext } from "../../context/CurrentFamilyMemberContext";

export const DisplayFamilyMember = () => {

  const [familyMemberContext, setFamilyMemberContext] = useContext(CurrentFamilyMemberContext);
  const [familymembers, setFamilymembers] = useState([])


  const handleFamilyMembers = async () => {
    await axios.get("familymembers/members/")
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
              <Dropdown.Item key={familymember.name}><Link onClick={() => setFamilyMemberContext(JSON.stringify(familymember))} to="taskboard/">{familymember.name}</Link></Dropdown.Item>
              )
          })}
          <Link to="/addfamilymember" className={styles.Link}>Add Family Member<FontAwesomeIcon icon={faUserPlus} /></Link>
        </Col>
      </Row>
    </>
  )
}
