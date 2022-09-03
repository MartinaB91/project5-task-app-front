import './App.css';
import NavBar from './components/common/NavBar';
import Footer from './components/common/Footer';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import SignUpForm from "./pages/SignUp";
import SignInForm from './pages/SignIn';
import HomePage from './pages/Home';
import "./api/axiosDefaults";

const  App = () => {
  return (
    <div className="App">
      < NavBar />
      <Container fluid className="p-0">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/signin" element={<SignInForm />} />
          <Route exact path="/signup" element={<SignUpForm />} />
          <Route exact path="/taskboard" element={<h1>Task board</h1>} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
