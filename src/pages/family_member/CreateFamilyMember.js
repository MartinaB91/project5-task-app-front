import React from "react";
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Image } from "react-bootstrap";
import styles from '../../styles/CreateFamilyMember.module.css';
import { useNavigate } from "react-router-dom";
import { useState, useRef } from 'react';
import { DisplayFamilyMember } from "../../components/common/DisplayFamilyMember";
import FormImage from "../../assets/images/test-sign-in.jpg"



const CreateFamilyMemberForm = () => {
    const [createFamilyMemberForm, setCreateFamilyMemberForm] = useState({
        family_member_img: "",
        name: "",
        role: "",

    });

    const { family_member_img, name, role } = createFamilyMemberForm;

    const [error, setError] = useState({});

    const imageInput = useRef(null);
    const navigate = useNavigate();

    const onFormFieldUpdate = (e) => {
        setCreateFamilyMemberForm({
            ...createFamilyMemberForm,
            [e.target.name]: e.target.value,
        });

    };

    const onImagefieldUpdate = (event) => {
        if (event.target.files.length){
            URL.revokeObjectURL(family_member_img);
            setCreateFamilyMemberForm({
                ...createFamilyMemberForm,
                family_member_img: URL.createObjectURL(event.target.files[0])
            });            
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {

            const formData = new FormData();

            formData.append("name", name);
            formData.append("role", role);
            formData.append("family_member_img", imageInput.current.files[0]);


            const { data } = axios.post('familymembers/members/', formData);
            // navigate(`/familymembers/members/${data.id}`);
            navigate('/');
        } catch (error) {
            alert.apply(error);
            setError(error.response?.data);
        }
    };
    return (
        <Container fluid className={styles.Container}>
        <div className={styles.FormWrapper}>
            <h2 className={styles.Header}>Add Family Member</h2>
            <Form onSubmit={handleFormSubmit}>
                <Row>
                    <Col className="mx-auto text-start">
                    <Form.Group className="mb-3">
                        {family_member_img ? (
                            <>
                            <Image roundedCircle className={`${styles.Image} mb-4 d-block`}  src={family_member_img}/>
                            <Form.Label htmlFor="image-upload" className={styles.Header}>Change Photo</Form.Label>
                            </>

                        ) : (
                            <>
                            <Image roundedCircle className={`${styles.Image} mb-4 justify-content-center d-block`} src={"https://www.svgrepo.com/show/182626/user-profile.svg"}/>
                            <Form.Label htmlFor="image-upload" className={styles.Header}>Add a Photo</Form.Label>
                            </>
                        )}
                            <Form.Control
                                type="file"
                                name="family_member_img"
                                id="image-upload"
                                accept = "image/jpeg,image/png,image/jpg"
                                onChange={onImagefieldUpdate}
                                ref={imageInput}
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="nickname">
                            <Form.Label className={styles.Header}>Nickname</Form.Label>
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
                    </Col>
                </Row>
                <Button variant="dark" type="submit" className="mt-4">
                    Create member
                </Button>
            </Form>
            </div>
            <Image className={styles.BackgroundImage} src={FormImage} />
        </Container>
    )
}
export default CreateFamilyMemberForm;