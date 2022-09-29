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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons'


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

    const emptyFamilyMemberInfo = (
        <>
        <FontAwesomeIcon className={styles.FontAwesomeIcon} icon={faFaceSmile} />
        <p className={styles.ScoreBoardText}>Choose a member</p>
        </>
    )

    const familyMemberInfo = currentFamilyMemberObj === null || currentFamilyMemberObj === "" ? 
        emptyFamilyMemberInfo : 
            <Row className="d-md-block">
                <Col xs={5} sm={12} className="text-center">
                    <Image roundedCircle src={currentFamilyMemberObj.family_member_img} className={styles.Image} />
                    <h4 className={styles.ScoreBoardText}>{currentFamilyMemberObj.name}</h4>
                </Col>
                <Col xs={3} sm={12} className="text-center">
                    <p className={styles.ScoreBoardNumber}>{currentFamilyMemberObj.star_points}</p>
                    <h4 className={styles.ScoreBoardText}>Star Points</h4>
                </Col>
                <Col xs={4} sm={12} className="text-center">
                    <p className={styles.ScoreBoardNumber}>{currentFamilyMemberObj.ongoing_tasks}</p>
                    <h4 className={styles.ScoreBoardText}>Ongoing Tasks</h4>
                </Col>
                <Col className="d-none d-sm-block">
                    <p className={styles.ScoreBoardNumber}>{currentFamilyMemberObj.closed_tasks}</p>
                    <h4 className={styles.ScoreBoardText}>Closed Tasks</h4>
                </Col>
            </Row> ;

    return (
        <>
            {/* {familyMemberContext === null || familyMemberContext === "" ? emptyFamilyMemberInfo : familyMemberInfo} */}
            {familyMemberInfo}
        </>
    )

}
