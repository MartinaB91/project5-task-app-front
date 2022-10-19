import React from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Image from "react-bootstrap/Image";
import { CurrentFamilyMemberContext } from "../../context/CurrentFamilyMemberContext";
import Rabbit from "../../assets/images/rabbit-3.webp";
import styles from "../../styles/DeleteTask.module.css";

export const DeleteTask = () => {
    const { id, title, assigned } = useParams();
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
                    {currentFamilyMemberObj !== null && currentFamilyMemberObj.id !== null ? (
                        <>
                            {currentFamilyMemberObj.role === 1 && assigned ==="null" ?
                                <Button className={`${styles.DeleteButton} mt-2`} variant="dark" onClick={handleDelete}>Delete</Button>
                                :
                                <>
                                    {currentFamilyMemberObj.role === 0 ?
                                        <Alert variant='warning' className='text-center mt-5'>Ask your parents to delete task</Alert>
                                        :
                                        <Alert variant='warning' className='text-center mt-5'>You can't delete an assigned task</Alert>
                                    }
                                </>
                            }
                        </>
                    ) : (
                        <Alert variant='warning' className='text-center mt-5'>You need to choose a family member first</Alert>
                    )
                    }
                </Col>
            </Row>
            <Image className={styles.BackgroundImage} src={Rabbit} />
        </Container>
    );
};
