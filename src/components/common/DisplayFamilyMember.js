import axios from 'axios';
import { Row, Col } from "react-bootstrap";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import styles from "../../styles/DisplayFamilyMember.module.css"
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faArrowDown } from '@fortawesome/free-solid-svg-icons';
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
      <h4 className='mb-4 mt-2 text-center'>Choose a family member</h4>
      {familymembers === "" ?
        <>
          <p className='text-center mt-2'>You haven’t added any family members yet.</p>
          <p className='text-center mb-5'>Create one below <FontAwesomeIcon icon={faArrowDown} /></p>
        </>
        :
        <Row>
          {familymembers.map((familymember) => {
            return (
              <Col xs={6} md={4} key={familymember.id}>
                <Link className={styles.Link} onClick={() => setFamilyMemberContext(JSON.stringify(familymember))} to="taskboard/">
                  <Image roundedCircle className={styles.Image} src={familymember.family_member_img}></Image>
                  <p className={styles.MemberDropdownText}>{familymember.name}</p>
                </Link>
              </Col>
            )
          })}
        </Row>
      }
      <Link to="/addfamilymember" className={styles.Link}>Add Family Member<FontAwesomeIcon icon={faUserPlus} className={styles.AddMemberIcon}/></Link>
    </>
  )
}
