import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { useState, useContext } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Container, Row, Col } from "react-bootstrap";
import { useCurrentUser, setCurrentUser } from "../../context/CurrentUser";
import { CurrentFamilyMemberContext } from "../../context/CurrentFamilyMemberContext";
import Test from "../../assets/images/test-sign-in.jpg";
import styles from "../../styles/MyScoreBoard.module.css";


export const MyScoreBoard = (props) => {
    const currentUser = useCurrentUser();
    const { id } = useParams();

    const [familymember, setFamilyMember] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: familymember }] = await Promise.all([
                    axiosReq.get(`/familymembers/members/${id}`),
                ]);
                setFamilyMember({ results: [familymember] });
                console.log(familymember);

            } catch (error) {
                console.log(error);

            }
        };
        handleMount();
    }, [id]);
    const [familyMemberContext] = useContext(CurrentFamilyMemberContext);

    // Convert json to js object
    const currentFamilyMemberObj = JSON.parse(familyMemberContext);

    const familyMemberInfo = (
            <Row className="d-md-block">
                <Col xs={5} sm={12} className="text-center">
                    <Image roundedCircle src={Test} className={styles.Image} />
                    <p className={styles.ScoreBoardText}>{currentFamilyMemberObj.name}</p>
                </Col>
                <Col xs={3} sm={12} className="text-center">
                    <p className={styles.ScoreBoardNumber}>{currentFamilyMemberObj.star_points}</p>
                    <p className={styles.ScoreBoardText}>Star Points</p>
                </Col>
                <Col xs={4} sm={12} className="text-center">
                    <p className={styles.ScoreBoardNumber}>{currentFamilyMemberObj.ongoing_tasks}</p>
                    <p className={styles.ScoreBoardText}>Ongoing Tasks</p>
                </Col>
                <Col className="d-none d-sm-block">
                    <p className={styles.ScoreBoardNumber}>{currentFamilyMemberObj.closed_tasks}</p>
                    <p className={styles.ScoreBoardText}>Closed Tasks</p>
                </Col>
            </Row>
    )

    const emptyFamilyMemberInfo = (
        <h3>there is no choosen familymember. Please choose a member</h3>
    )

    return (
        <>
            {familyMemberContext === null || familyMemberContext === "" ? emptyFamilyMemberInfo : familyMemberInfo}
        </>
    )

}
