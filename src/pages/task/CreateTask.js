import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col } from 'react-bootstrap';
import { Image } from "react-bootstrap";
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import styles from '../../styles/CreateTask.module.css';
import { CurrentFamilyMemberContext } from "../../context/CurrentFamilyMemberContext";
import BackgroundForm from "../../assets/images/dots.webp";

export const CreateTask = () => {
    const [familyMemberContext] = useContext(CurrentFamilyMemberContext);
    const currentFamilyMemberObj = JSON.parse(familyMemberContext);

    const [createTaskForm, setCreateTaskForm] = useState({
        title: "",
        category_name: "",
        end_date: "",
        description: "",
        star_points: "",
        assigned: "",
        creator: currentFamilyMemberObj.id,
    });

    const { title, category_name, end_date, description, star_points, assigned } = createTaskForm;

    const [errors, setError] = useState({});
    const [categories, setCategories] = useState([]);
    const [familymembers, setFamilymember] = useState([]);

    const navigate = useNavigate();

    const onFormFieldUpdate = (e) => {
        setCreateTaskForm({
            ...createTaskForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleCategories = async () => {
        // Gets all categories options
        await axios.get("category/categories/")
            .then((response) => {
                console.log(response);

                // "Convert" json to array
                let responseAsArray = [];
                for (let resp of response.data) {
                    responseAsArray.push(resp);
                }

                setCategories(responseAsArray);
            })
            .catch((e) => console.log(e));
    };


    const handleFamilyMembers = async () => {
        // Gets all family member you can assign your task to
        await axios.get("familymembers/members/")
            .then((response) => {
                console.log(response);

                // "Convert" json to array
                let responseAsArray = [];
                for (let resp of response.data) {
                    responseAsArray.push(resp);
                }
                setFamilymember(responseAsArray);

            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        handleCategories();
        handleFamilyMembers();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        axios.post('taskboard/tasks/', createTaskForm)
            .then((response) => {
                if (response.status === 201) {
                    navigate('/taskboard');
                }
            })
            .catch((e) => {
                console.log(e);
                setError(e.response?.data);
            });
    };

    return (
        <Container fluid className={styles.Container}>
            <Row>
                <Col xs={12} sm={10} md={6} lg={4} className={`${styles.FormWrapper} mx-auto text-start`}>
                    <h1 className={styles.Header}>Add Task</h1>
                    {currentFamilyMemberObj.role === 1 ?
                        <Form onSubmit={handleFormSubmit}>

                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter title"
                                    name="title"
                                    onChange={onFormFieldUpdate}
                                    value={title}
                                />
                            </Form.Group>
                            {errors.title?.map((message, idx) =>
                                <Alert variant='warning' key={idx}>{message}</Alert>
                            )}

                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="category">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control
                                            as="select"
                                            type="arrayOf"
                                            name="category_name"
                                            onChange={onFormFieldUpdate}
                                            value={category_name}
                                        >
                                            {/* Inspiration from:
                                    https://www.pluralsight.com/guides/how-to-get-selected-value-from-a-mapped-select-input-in-react
                                 */}
                                            <option disabled={true} value="">Choose a category</option>
                                            {categories.map((categoryObj) => (
                                                <option value={categoryObj.name} key={categoryObj.id}>{categoryObj.name}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    {errors.category_name?.map((message, idx) =>
                                        <Alert variant='warning' key={idx}>{message}</Alert>
                                    )}
                                </Col>

                                <Col>
                                    <Form.Group className="mb-3" controlId="star_points">
                                        <Form.Label>Star Points</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="star_points"
                                            onChange={onFormFieldUpdate}
                                            value={star_points}
                                            placeholder="Enter a number between 1-20"
                                            min={1}
                                            max={20}
                                        />
                                    </Form.Group>
                                    {errors.star_points?.map((message, idx) =>
                                        <Alert variant='warning' key={idx}>{message}</Alert>
                                    )}
                                </Col>
                            </Row>

                            <Form.Group className="mb-3" controlId="endDate">
                                <Form.Label>End date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="end_date"
                                    onChange={onFormFieldUpdate}
                                    value={end_date}
                                />
                            </Form.Group>
                            {errors.end_date?.map((message, idx) =>
                                <Alert variant='warning' key={idx}>{message}</Alert>
                            )}

                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    type="text"
                                    name="description"
                                    placeholder="Describe what needs to be done"
                                    onChange={onFormFieldUpdate}
                                    value={description}
                                />
                            </Form.Group>
                            {errors.description?.map((message, idx) =>
                                <Alert variant='warning' key={idx}>{message}</Alert>
                            )}


                            <Form.Group className="mb-3" controlId="assigned">
                                <Form.Label>Want to assign your task?</Form.Label>
                                <Form.Control
                                    as="select"
                                    type="arrayOf"
                                    name="assigned"
                                    onChange={onFormFieldUpdate}
                                    value={assigned}
                                >
                                    <option disabled={true} value="">Choose a member</option>
                                    {familymembers.map((familymember) => (
                                        <option value={familymember.id} key={familymember.id}>{familymember.name}</option>
                                    ))}

                                </Form.Control>
                            </Form.Group>
                            {errors.assigned?.map((message, idx) =>
                                <Alert variant='warning' key={idx}>{message}</Alert>
                            )}
                            <Button variant="dark" type="submit">
                                Add Task
                            </Button>
                            {errors.non_field_errors?.map((message, idx) =>
                                <Alert variant='warning' key={idx}>{message}</Alert>
                            )}
                        </Form>
                        :
                        <Alert variant='warning' className='mt-5 text-center'>Ask your parents to create a task</Alert>
                    }
                </Col>
            </Row>
            {/* <Image className={styles.BackgroundImage} src={FormImage} /> */}
            <Image className={styles.BackgroundImage} src={BackgroundForm} />
        </Container>

    )
}
