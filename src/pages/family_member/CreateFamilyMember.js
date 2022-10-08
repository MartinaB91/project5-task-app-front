import React from "react";
import axios from 'axios';
import { CurrentFamilyMemberContext } from "../../context/CurrentFamilyMemberContext";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Image } from "react-bootstrap";
import styles from '../../styles/CreateFamilyMember.module.css';
import { useNavigate } from "react-router-dom";
import { useState, useRef, useContext } from 'react';
import { Alert } from 'react-bootstrap';
import { DisplayFamilyMember } from "../../components/common/DisplayFamilyMember";
import BackgroundForm from "../../assets/images/dots.webp";
import RabbitFace from "../../assets/images/rabbit-face-1.svg";



const CreateFamilyMemberForm = () => {
    const [familyMemberContext] = useContext(CurrentFamilyMemberContext);
    const currentFamilyMemberObj = JSON.parse(familyMemberContext);

    const [createFamilyMemberForm, setCreateFamilyMemberForm] = useState({
        family_member_img: "",
        name: "",
        role: "",

    });

    const { family_member_img, name, role } = createFamilyMemberForm;

    const [errors, setError] = useState({});

    const imageInput = useRef(null);
    const navigate = useNavigate();

    const onFormFieldUpdate = (e) => {
        setCreateFamilyMemberForm({
            ...createFamilyMemberForm,
            [e.target.name]: e.target.value,
        });

    };

    const onImagefieldUpdate = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(family_member_img);
            setCreateFamilyMemberForm({
                ...createFamilyMemberForm,
                family_member_img: URL.createObjectURL(event.target.files[0])
            });
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("name", name);
        formData.append("role", role);
        formData.append("family_member_img", imageInput.current.files[0]);
        try {
            
            const { data } = await axios.post('familymembers/members/', formData);
            // navigate(`/familymembers/members/${data.id}`);
            navigate('/');
        } catch (error) {
            alert.apply(error);
            setError(error.response?.data);
        }
    };
    return (
        <Container fluid className={styles.Container}>
            <Row>
                <Col xs={12} sm={10} md={6} lg={4} className={`${styles.FormWrapper} text-start`}>
                    <h1 className={styles.Header} id={styles["create-member-header"]}>Add Family Member</h1>
                    {currentFamilyMemberObj.role == 1 ?
                    <Form onSubmit={handleFormSubmit}>

                        {/* <Col xs={12} className="mx-auto text-start"> */}
                        <Form.Group className="mb-3">
                            {family_member_img ? (
                                <>
                                    <Image roundedCircle className={`${styles.Image} mb-4 d-block`} src={family_member_img} />
                                    <Form.Label htmlFor="image-upload" className={`${styles.Header} ${styles.Label}`}>Change Photo</Form.Label>
                                </>

                            ) : (
                                <>
                                    <Image roundedCircle className={`${styles.Image} mb-4 justify-content-center d-block`} src={RabbitFace} />
                                    <Form.Label htmlFor="image-upload" className={`${styles.Header} ${styles.Label}`}>Add a Photo</Form.Label>
                                </>
                            )}
                            <Form.Control
                                type="file"
                                name="family_member_img"
                                id="image-upload"
                                accept="image/jpeg,image/png,image/jpg"
                                onChange={onImagefieldUpdate}
                                ref={imageInput}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="nickname">
                            <Form.Label className={`${styles.Header} ${styles.Label}`}>Nickname</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter nickname"
                                name="name"
                                onChange={onFormFieldUpdate}
                                value={name}
                            />
                        </Form.Group>

                        <Form.Check
                            inline
                            label="Child"
                            name="role"
                            type="radio"
                            aria-label="Family member child button choice"
                            onChange={onFormFieldUpdate}
                            value="0"
                        />
                        <Form.Check
                            inline
                            radioGroup="role"
                            label="Parent"
                            name="role"
                            type="radio"
                            aria-label="Family member parent button choice"
                            onChange={onFormFieldUpdate}
                            value="1"
                        />
                        {/* </Col> */}
                        <Button variant="dark" type="submit" className="mt-4 d-block">
                            Add family member
                        </Button>
                    </Form>
                    :
                    <Alert variant='warning'>Ask your parents to add a new family member</Alert>
                    }
                </Col>
            </Row>
            <Image className={styles.BackgroundImage} src={BackgroundForm} />
        </Container>
    )
}
export default CreateFamilyMemberForm;