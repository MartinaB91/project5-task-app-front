import styles from './App.module.css';
import NavBar from './components/common/NavBar';
import Footer from './components/common/Footer';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import SignUpForm from "./pages/SignUp";
import SignInForm from './pages/SignIn';
import HomePage from './pages/Home';
import "./api/axiosDefaults";
import TaskBoard from './pages/task/TaskBoard';
import CreateFamilyMemberForm from './pages/family_member/CreateFamilyMember';
import { CreateTask } from './pages/task/CreateTask';
import { EditTask } from './pages/task/EditTask';
import { DeleteTask } from './pages/task/DeleteTask';
import NotFound from "./components/common/NotFound";


const  App = () => {

  return (
    <div className={`${styles.App} ${styles.TextBody}`}>
      < NavBar />
      <Container fluid className= {`${styles.Container}`}>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/signin" element={<SignInForm />} />
          <Route exact path="/signup" element={<SignUpForm />} />
          <Route exact path="/taskboard" element={<TaskBoard />} />
          <Route exact path="/addfamilymember" element={<CreateFamilyMemberForm />} />
          <Route exact path="/addtask" element={<CreateTask />}/>
          <Route exact path="/tasks/:id/edit" element={<EditTask />}/>
          <Route exact path="/tasks/:id/:title/:assigned/delete" element={<DeleteTask />}/>
          <Route exact path="/pagenotfound" element={<NotFound />}/>


          
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
