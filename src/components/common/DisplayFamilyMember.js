import { Image } from 'react-bootstrap';
import axios from 'axios';
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/DisplayFamilyMember.module.css"

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

  return (
    <>
        <Row>
          <Col>
            {familymembers.map((familymember) => {
              return (
                <h1 key={familymember.name}>{familymember.name}</h1>
                // <Image key={familymember.name} roundedCircle src={familymember.family_member_img}/>
              )
            })}
          </Col>
        </Row>
        <Link to="/addfamilymember" className={styles.Link}>Add Family Member</Link>
      <button onClick={handleFamilyMembers}>Show Family Members</button>

    </>
  )
}
