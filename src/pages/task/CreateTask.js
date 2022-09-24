import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import styles from '../../styles/CreateTask.module.css';

export const CreateTask = () => {
    const [createTaskForm, setCreateTaskForm] = useState({
        title: "",
        category: "",
        end_date: "",
        description: "",
        star_points: "",
        assigned: "",
    });

    const { title, category, end_date, description, star_points, assigned } = createTaskForm;

    const [error, setError] = useState({});
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    const onFormFieldUpdate = (e) => {
        setCreateTaskForm({
            ...createTaskForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleCategories = async () => {
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

    useEffect(() => {
        handleCategories();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = axios.post('tasks/', createTaskForm);
            navigate('/taskboard');
        } catch (error) {
            alert.apply(error);
            setError(error.response?.data);
        }
    };

    return (
        <Container className={styles.Container}>
            <h2>Add Task</h2>
            <Form onSubmit={handleFormSubmit}>
                <Row>
                    <Col xs={12} md={10} lg={6} className="mx-auto text-start">
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

                        <Form.Group className="mb-3" controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                type="arrayOf"
                                name="category"
                                onChange={onFormFieldUpdate}
                                value={category}
                            >
                                <option value="" disabled selected>Choose a category</option>
                                {categories.map((category) => (
                                    <option key={category.id}>{category.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="endDate">
                            <Form.Label>End date</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="end_date"
                                onChange={onFormFieldUpdate}
                                value={end_date}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                type="text"
                                name="description"
                                onChange={onFormFieldUpdate}
                                value={description}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="star_points">
                            <Form.Label>Star Points</Form.Label>
                            <Form.Control
                                type="number"
                                name="star_points"
                                onChange={onFormFieldUpdate}
                                value={star_points}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="assigned">
                            <Form.Label>Assign</Form.Label>
                            <Form.Control
                                // as = {options.map((option) => (
                                //     <option>{option.name}</option>
                                // ))}
                                type="arrayOf"
                                name="assigned"
                                onChange={onFormFieldUpdate}
                                value={assigned}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="secondary" type="submit">
                    Create Task
                </Button>
            </Form>
        </Container>

    )
}
