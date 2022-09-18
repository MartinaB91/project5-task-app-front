import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { useState, useContext } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Container, Row } from "react-bootstrap";
import { useCurrentUser, setCurrentUser } from "../../context/CurrentUser";
import { CurrentFamilyMemberContext } from "../../context/CurrentFamilyMemberContext";


export const MyScoreBoard = () => {
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
    return (
        <>
            <h3>My Score board</h3>
            <h4>{currentFamilyMemberObj.name}</h4>
            <Image roundedCircle cmb-4 src={currentFamilyMemberObj.family_member_img} />
            <h4>Star points: {currentFamilyMemberObj.star_points}</h4>
            <h4>ongoing tasks: {currentFamilyMemberObj.ongoing_tasks}</h4>
            <h4>closed tasks: {currentFamilyMemberObj.closed_tasks}</h4>
        </>
    )
}
