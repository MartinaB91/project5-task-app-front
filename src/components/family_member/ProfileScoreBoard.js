import React, { useContext, useEffect } from 'react';
import { useCurrentUser, setCurrentUser, CurrentUserContext } from "../../context/CurrentUser";
import { useParams } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import styles from "../../styles/ProfileScoreBoard.module.css";
import Test from "../../assets/images/test-sign-in.jpg";

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
        {/* <h4 className={styles.h4}>{currentUser.username} Scoreboard</h4> */}
        <Row>
        <Col xs={4}>
            <Image roundedCircle src={Test} className={styles.Image} />
            <p className={styles.ScoreBoardText}>Family star</p>
        </Col>
        <Col xs={4}>
            <p className={styles.ScoreBoardNumber}>10</p>
            <p className={styles.ScoreBoardText}>To-Do</p>
        </Col>
        <Col xs={4}>
            <p className={styles.ScoreBoardNumber}>10</p>
            <p className={styles.ScoreBoardText}>Completed</p>
        </Col> 
        </Row>
    </>
    )

    // <p>{profile["user"]}</p>
}
