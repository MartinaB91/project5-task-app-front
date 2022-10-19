import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from "react-bootstrap/Image";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import styles from '../../styles/CreateTask.module.css';
import { CurrentFamilyMemberContext } from "../../context/CurrentFamilyMemberContext";
import { axiosReq } from '../../api/axiosDefaults';
import BackgroundForm from "../../assets/images/dots.webp";

export const EditTask = () => {
    const [familyMemberContext] = useContext(CurrentFamilyMemberContext);
    const currentFamilyMemberObj = JSON.parse(familyMemberContext);
    const { id } = useParams();

    const [createTaskForm, setCreateTaskForm] = useState({
        title: "",
        category_name: "",
        end_date: "",
        description: "",
        star_points: "",
        assigned: "",
        creator: currentFamilyMemberObj?.id,
        task_id: id
    });

    const { title, category_name, end_date, description, star_points, assigned, creator, task_id } = createTaskForm;

    const [error, setError] = useState({});
    const [categories, setCategories] = useState([]);
    const [familymembers, setFamilymember] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`taskboard/tasks/${id}/`);
                const { title, category_name, end_date, description, star_points, assigned, belongs_to_profile } = data;
                belongs_to_profile ? setCreateTaskForm({ title, category_name, end_date, description, star_points, assigned, creator, id }) : navigate('/taskboard');

            } catch {
                // Implement error handling in future version
            }
        };
        handleMount();
        // React Hook useEffect has a missing dependency: 'creator'. Either include it or remove the dependency array
        // We don't wan't useEffect to triggers every time 'creator'(currentFamilyMemberObj.id) changes only use value. 
    }, [navigate, id]);

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
                // "Convert" json to array
                let responseAsArray = [];
                for (let resp of response.data) {
                    responseAsArray.push(resp);
                }

                setCategories(responseAsArray);
            })
            .catch(
                // Implement error handling in future version
            );
    };


    const handleFamilyMembers = async () => {
        // Gets all family member you can assign your task to
        await axios.get("familymembers/members/")
            .then((response) => {
                // "Convert" json to array
                let responseAsArray = [];
                for (let resp of response.data) {
                    responseAsArray.push(resp);
                }
                setFamilymember(responseAsArray);

            })
            .catch(
                // Implement error handling in future version
            );
    };

    useEffect(() => {
        handleCategories();
        handleFamilyMembers();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            axios.put(`taskboard/tasks/${id}/`, createTaskForm);
            navigate('/taskboard');
        } catch (error) {
            alert.apply(error);
            setError(error.response?.data);
        }
    };

    return (
        <Container fluid className={styles.Container}>
            <Row>
                <Col xs={12} sm={10} md={6} lg={4} className={`${styles.FormWrapper} text-start`}>
                    <h1 className={styles.Header}>Edit Task</h1>
                    {currentFamilyMemberObj.role === 1 && assigned === null ?
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
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="star_points">
                                        <Form.Label>Star Points</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="star_points"
                                            onChange={onFormFieldUpdate}
                                            value={star_points}
                                            min={1}
                                            max={20}
                                        />
                                    </Form.Group>
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

                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    type="text"
                                    name="description"
                                    onChange={onFormFieldUpdate}
                                    value={description}
                                />
                            </Form.Group>

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
                            <Button variant="dark" type="submit">
                                Edit Task
                            </Button>
                        </Form>
                        :
                        <>
                            {currentFamilyMemberObj.role === 0 ?
                                <Alert variant='warning' className='text-center mt-5'>Ask your parents to edit task</Alert>
                                :
                                <Alert variant='warning' className='text-center mt-5'>You can't edit an assigned task</Alert>}
                        </>}
                </Col>
            </Row>
            <Image className={styles.BackgroundImage} src={BackgroundForm} aria-label="background colorful dots" />
        </Container>
    );
};
