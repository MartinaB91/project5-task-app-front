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
            const { data } = axios.post('familymembers/members/', createFamilyMemberForm);
            
            // navigate(`/familymembers/members/${data.id}`);
            navigate('/');
        } catch (error) {
            alert.apply(error);
            setError(error.response?.data);
        }
    };
    return (
        <Container className={styles.Container}>
            <h2>Add Family Member</h2>
            <Form onSubmit={handleFormSubmit}>
                <Row>
                    <Col xs={12} md={10} lg={6} className="mx-auto text-start">
                    <Form.Group className="mb-3">
                        {family_member_img ? (
                            <>
                            <Image roundedCircle className={`${styles.Image} mb-4 d-block`}  src={family_member_img}/>
                            <Form.Label htmlFor="image-upload">Change Photo</Form.Label>
                            </>

                        ) : (
                            <>
                            <Image roundedCircle className={`${styles.Image} mb-4 justify-content-center d-block`} src={"https://www.svgrepo.com/show/182626/user-profile.svg"}/>
                            <Form.Label htmlFor="image-upload">Add a Photo</Form.Label>
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
                            <Form.Label>Nickname</Form.Label>
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
                <Button variant="secondary" type="submit">
                    Create member
                </Button>
            </Form>
        </Container>
    )
}
export default CreateFamilyMemberForm;