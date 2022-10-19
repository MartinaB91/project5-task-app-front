import React from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import HiddenRabbit from "../../assets/images/hidden-rabbit.svg";
import styles from "../../styles/NotFound.module.css";


const NotFound = () => {
  return (
    <Container fluid className={styles.Container}>
        <Image roundedCircle src={HiddenRabbit} className={styles.Image}/>
        <h4 className={styles.NotFoundText}>Oops.... This page don't exist.</h4>
        <p className='text-center'>404 ERROR</p>
    </Container>
  );
};

export default NotFound;