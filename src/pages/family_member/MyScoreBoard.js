import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { useState, useContext } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Container, Row, Col } from "react-bootstrap";
import { useCurrentUser, setCurrentUser } from "../../context/CurrentUser";
import { CurrentFamilyMemberContext } from "../../context/CurrentFamilyMemberContext";
import styles from "../../styles/MyScoreBoard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faStar } from '@fortawesome/free-solid-svg-icons'
import RabbitFace  from "../../assets/images/rabbit-face-1.svg"


export const MyScoreBoard = (props) => {
    const currentUser = useCurrentUser();
    const { id } = useParams();
    const [familyMemberContext] = useContext(CurrentFamilyMemberContext);
    // Convert json to js object
    const currentFamilyMemberObj = JSON.parse(familyMemberContext);

    const [familymember, setFamilyMember] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: familymember }] = await Promise.all([
                    axiosReq.get(`/familymembers/members/${currentFamilyMemberObj.id}`),
                ]);
                setFamilyMember({ results: [familymember] });
                console.log(familymember);

            } catch (error) {
                console.log(error);

            }
        };
        handleMount();
    }, [currentFamilyMemberObj.id]);


    const emptyFamilyMemberInfo = (
        <Row className="d-md-block justify-content-center">
        <Image src={RabbitFace} className={`${styles.RabbitFace} mt-3`} />
        <p className={`${styles.ScoreBoardText} text-center`}>You haven't choosen a family member yet. Please Select one in the navbar</p>
        </Row>
    )

    const familyMemberInfo = currentFamilyMemberObj.id == null || currentFamilyMemberObj.id === "" ? 
        emptyFamilyMemberInfo : 
            <Row className="d-md-block shadow-sm">
                <h2 className={styles.ScoreBoardHeader}>My Scores</h2>
                <Col xs={5} sm={12} className="text-center">
                    <Image roundedCircle src={currentFamilyMemberObj.family_member_img} className={styles.Image} />
                    <h4 className={styles.ScoreBoardText}>{currentFamilyMemberObj.name}</h4>
                </Col>
                <Col xs={3} sm={12} className="text-center">
                    <p className={styles.ScoreBoardNumber}>{currentFamilyMemberObj.star_points}</p>
                    <h4 className={styles.ScoreBoardText}>Star Points<FontAwesomeIcon icon={faStar} className={styles.FontAwesomeIcon} /></h4>
                </Col>
                <Col xs={4} sm={12} className="text-center">
                    <p className={styles.ScoreBoardNumber}>{currentFamilyMemberObj.ongoing_tasks}</p>
                    <h4 className={styles.ScoreBoardText}>Ongoing</h4>
                </Col>
                <Col className="d-none d-sm-block text-center">
                    <p className={styles.ScoreBoardNumber}>{currentFamilyMemberObj.closed_tasks}</p>
                    <h4 className={`${styles.ScoreBoardText} mb-5`}>Closed</h4>
                </Col>
            </Row> ;

    return (
        <>
            {familyMemberInfo}
        </>
    )

}
