import styles from './App.module.css';
import NavBar from './components/common/NavBar';
import Footer from './components/common/Footer';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import SignUpForm from "./pages/SignUp";
import SignInForm from './pages/SignIn';
import HomePage from './pages/Home';
import "./api/axiosDefaults";
import TaskBoard from './pages/TaskBoard';


const  App = () => {
  
  return (
    <div className={styles.App}>
      < NavBar />
      <Container fluid className={styles.Container}>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/signin" element={<SignInForm />} />
          <Route exact path="/signup" element={<SignUpForm />} />
          <Route exact path="/taskboard" element={<TaskBoard />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
