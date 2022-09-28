import React, { useContext, useEffect } from 'react';
import { useCurrentUser, setCurrentUser, CurrentUserContext } from "../../context/CurrentUser";
import { useParams } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

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
        <Container>
            <h4>{currentUser.username} Scoreboard</h4>
            <h4>{profile["user"]} user</h4>
            <h4>{profile["created_at"]} created_at</h4>
            <h4>{profile["updated_at"]} updated_at</h4>
        </Container>
    )
}
