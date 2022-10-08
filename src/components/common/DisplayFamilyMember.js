import axios from 'axios';
import { Row, Col, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import styles from "../../styles/DisplayFamilyMember.module.css"
import Dropdown from 'react-bootstrap/esm/Dropdown';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { CurrentFamilyMemberContext } from "../../context/CurrentFamilyMemberContext";

export const DisplayFamilyMember = () => {

  const [familyMemberContext, setFamilyMemberContext] = useContext(CurrentFamilyMemberContext);
  const [familymembers, setFamilymembers] = useState([])
  const navigate = useNavigate();

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

  useEffect(() => {
    handleFamilyMembers();
  }, [navigate]);

  return (
    <>
      <Row>
        <h4 className='mb-4 mt-2'>Choose a family member</h4>
          {familymembers.map((familymember) => {
            return (
              <Col xs={6} md={4}  key={familymember.id}>
                <Link  className={styles.Link} onClick={() => setFamilyMemberContext(JSON.stringify(familymember))} to="taskboard/">
                  <Image roundedCircle className={styles.Image} src={familymember.family_member_img}></Image>
                  <p className={styles.MemberDropdownText}>{familymember.name}</p>
                </Link>
              </Col>
              )
          })}
          <Link to="/addfamilymember" className={styles.Link}>Add Family Member<FontAwesomeIcon icon={faUserPlus} /></Link>
      </Row>
    </>
  )
}
