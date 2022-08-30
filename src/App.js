import './App.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      < NavBar />
      <Container>
        <Routes>
          <Route exact path="/" element={<h1>Home</h1>} />
          <Route exact path="/signin" element={<h1>Sign In</h1>} />
          <Route exact path="/signup" element={<h1>Sign Up</h1>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
