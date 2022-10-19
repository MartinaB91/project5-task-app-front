import React from "react";
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Image from "react-bootstrap/Image";
import styles from '../../styles/CreateFamilyMember.module.css';
import { useNavigate } from "react-router-dom";
import { useState, useRef } from 'react';
import Alert from 'react-bootstrap/Alert';
import BackgroundForm from "../../assets/images/dots.webp";
import RabbitFace from "../../assets/images/rabbit-face-1.svg";
import { useCurrentUser } from "../../context/CurrentUser";
import MessageUnauthenticatedUser from "../../components/common/MessageUnauthenticatedUser";


const CreateFamilyMemberForm = () => {
    const currentUser = useCurrentUser();

    const [createFamilyMemberForm, setCreateFamilyMemberForm] = useState({
        family_member_img: "",
        name: "",
        role: 0,

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
        if (imageInput.current.files[0] !== undefined ) {
            formData.append("family_member_img", imageInput.current.files[0]);
        }
        
        await axios.post('familymembers/members/', formData)
            .then((response) => {
                if (response.status === 201) {
                    navigate("/taskboard");
                }
            })
            .catch((error) => {
                setError(error.response?.data);
            });
    };

    return (
        <>
        {currentUser == null || currentUser === "" ? (
            <MessageUnauthenticatedUser message="You need to sign in before adding a family member"/>
        ): 
        (
            <Container fluid className={styles.Container} >
            <Row>
                <Col xs={12} sm={10} md={6} lg={4} className={`${styles.FormWrapper} text-start`}>
                    <h1 className={styles.Header} id={styles["create-member-header"]}>Add Family Member</h1>
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Group className="mb-3">
                                {family_member_img ? (
                                    <>
                                        <Image roundedCircle className={`${styles.Image} mb-4 d-block`} src={family_member_img} aria-label="family member profile image" />
                                        <Form.Label htmlFor="image-upload" className={`${styles.Label}`}>Change Photo</Form.Label>
                                    </>

                                ) : (
                                    <>
                                        <Image roundedCircle className={`${styles.Image} mb-4 justify-content-center d-block`} src={RabbitFace} aria-label="default family member profile image"/>
                                        <Form.Label htmlFor="image-upload" className={`${styles.Label}`}>Add a Photo</Form.Label>
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
                                <Form.Label className={`${styles.Label}`}>Nickname</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter nickname"
                                    name="name"
                                    onChange={onFormFieldUpdate}
                                    value={name}
                                />
                            </Form.Group>
                            {errors.name?.map((message, idx) =>
                                <Alert variant='warning' key={idx}>{message}</Alert>
                            )}

                            <Form.Check
                                defaultChecked
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
                            <Button variant="dark" type="submit" className={`${styles.CreateMemberButton} mt-4 d-block`}>
                                Add family member
                            </Button>
                            {errors.non_field_errors?.map((message, idx) =>
                                <Alert variant='warning' key={idx}>{message}</Alert>
                            )}
                        </Form>
                </Col>
            </Row>
            <Image className={styles.BackgroundImage} src={BackgroundForm} aria-label="background colorful dots" />
        </Container>
        )}
        </>
    );
};

export default CreateFamilyMemberForm;