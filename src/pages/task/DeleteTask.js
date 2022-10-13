import React from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useContext } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { Image } from "react-bootstrap";
import { CurrentFamilyMemberContext } from "../../context/CurrentFamilyMemberContext";
import Rabbit from "../../assets/images/rabbit-3.webp";
import styles from "../../styles/DeleteTask.module.css";

export const DeleteTask = () => {
    const { id, title } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [familyMemberContext] = useContext(CurrentFamilyMemberContext);
    const currentFamilyMemberObj = JSON.parse(familyMemberContext);

    const handleDelete = async (e) => {
        try {
            await axiosReq.delete(`taskboard/tasks/${id}/`);
            navigate('/taskboard');
        } catch (error) {
            alert.apply(error);
            setError(error.response?.data);
        }
    };

    return (
        <Container fluid className={styles.Container}>
            <Row>
                <Col xs={12} sm={10} md={6} lg={4} className={`${styles.FormWrapper} mx-auto`}>
                    <h4 className={styles.DeleteHeader}>Want to delete task {title}?</h4>
                    {currentFamilyMemberObj.role == 1 ?
                        <Button className={`${styles.DeleteButton} mt-2`} variant="dark" onClick={handleDelete}>Delete</Button>
                        :
                        <Alert variant='warning' className='text-center mt-5'>Ask your parents to delete task</Alert>
                    }
                </Col>
            </Row>
            <Image className={styles.BackgroundImage} src={Rabbit} />
        </Container>
    )
}
