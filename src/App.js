import './App.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import SignUpForm from "./pages/SignUp";
import SignInForm from './pages/SignIn';
import "./api/axiosDefaults";

const  App = () => {
  return (
    <div className="App">
      < NavBar />
      <Container>
        <Routes>
          <Route exact path="/" element={<h1>Home</h1>} />
          <Route exact path="/signin" element={<SignInForm />} />
          <Route exact path="/signup" element={<SignUpForm />} />
          <Route exact path="/taskboard" element={<h1>Task board</h1>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
