import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import { getAuth } from "firebase/auth";
import app from './firebase.init';
import Button from 'react-bootstrap/Button';

const auth = getAuth(app);

function App() {
  // const handleEmailChange = (event) =>{
  const handleEmailBlur = (event) =>{
    console.log(event.target.value)//'something are written by me..')
  }
  const handlePasswordChange = (event) =>{
    console.log(event.target.value)//'something are written by me..')
  }
  const formSubmit = (event) =>{
    event.preventDefault();
    console.log('form submit')
  }
  return (
    <div>
      <div className="registration w-50 mx-auto mt-3">
      <h3 className='text-primary'>Please register!!</h3>
      <Form onSubmit={formSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onBlur={handlePasswordChange} type="password" placeholder="Password" />
      </Form.Group>
    
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

      </div>
    </div>
  );
}

export default App;
