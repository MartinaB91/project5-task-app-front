import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Container } from "react-bootstrap";
import { useCurrentUser, setCurrentUser } from "../../context/CurrentUser";
import {CurrentFamilyMemberContext} from "../../context/CurrentFamilyMemberContext";


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
    },[id]);
    const [familyMemberContext] = useContext(CurrentFamilyMemberContext);


    return (
        <Container>
            <h1>{familyMemberContext}</h1>
            <h2>Star points</h2>
            <h2>ongoing tasks</h2>
        </Container>
    )
}
