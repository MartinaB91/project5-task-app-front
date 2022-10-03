import React from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export const DeleteTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState({});

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
    <Container>
        <p className='mt-5'>Want to delete task {id}?</p>
        <Button variant="dark"  onClick={handleDelete}>Delete</Button>
    </Container>
  )
}
