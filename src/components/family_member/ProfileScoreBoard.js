import React, { useContext, useEffect } from 'react';
import { useCurrentUser, setCurrentUser, CurrentUserContext } from "../../context/CurrentUser";
import { useParams } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import styles from "../../styles/ProfileScoreBoard.module.css";
import Test from "../../assets/images/test-sign-in.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


export const ProfileScoreBoard = () => {
    const currentUser = useCurrentUser();
    const { id } = useParams();

    const [profile, setProfile] = useState({});

    useEffect(() => {
        const handleMount = async () => {
            await axios.get(`profiles/${currentUser["profile_id"]}`)
                .then((response) => {
                    // Set profile to Data
                    setProfile(response["data"]);
                })
                .catch((e) => console.log(e));
        };
        handleMount();
    }, [id]);

    return (
    <>
        <Row className="justify-content-sm-center">
        <Col xs={5} sm={3}>
            <Image roundedCircle src={Test} className={styles.Image} />
            <h4 className={styles.FamilyStar}>User</h4>
            <h4 className={styles.ScoreBoardTextImage}>Family star
                <FontAwesomeIcon icon={faStar} className={styles.FontAwesomeIcon} />
            </h4>
        </Col>
        <Col xs={3} sm={3} className="text-start text-md-center">
            <p className={styles.ScoreBoardNumber}>10</p>
            <h4 className={styles.ScoreBoardText}>To-Do</h4>
        </Col> 
        <Col xs={4} sm={3}>
            <p className={styles.ScoreBoardNumber}>10</p>
            <h4 className={styles.ScoreBoardText}>Completed Tasks</h4>
        </Col>
        <Col className="d-none d-sm-block">
            <p className={styles.ScoreBoardNumber}>10</p>
            <h4 className={styles.ScoreBoardText}>Ongoing Tasks</h4>
        </Col>
        </Row>
    </>
    )
    {/* <h4 className={styles.h4}>{currentUser.username} Scoreboard</h4> */}
    // <p>{profile["user"]}</p>
}
