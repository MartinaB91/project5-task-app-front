import React from "react";
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import styles from '../../styles/CreateFamilyMember.module.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';


const CreateFamilyMemberForm = () => {
    const [createFamilyMemberForm, setCreateFamilyMemberForm] = useState({
        family_member_img: "",
        name: "",
        role: "",

    });

    const { family_member_img, name, role } = createFamilyMemberForm;

    const [error, setError] = useState({});

    const navigate = useNavigate();

    const onFormFieldUpdate = (e) => {
        setCreateFamilyMemberForm({
            ...createFamilyMemberForm,
            [e.target.name]: e.target.value,
        });

    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            axios.post('/familymembers/', createFamilyMemberForm);
            navigate("/");
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
                    <Form.Group roundedCircle className="mb-3" controlId="memberImage">
                            <img src={"https://www.svgrepo.com/show/182626/user-profile.svg"} className="mb-4"/>
                            <Form.Control
                                type="file"
                                name="family_member_img"
                                accept = "image/jpeg,image/png"
                                onChange={onFormFieldUpdate}
                                value={family_member_img}
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