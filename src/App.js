import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from './firebase.init';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  const [error,setError] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  console.log(error)
  const handleEmailBlur = (event) =>{
    setEmail(event.target.value)
  }
  const handlePasswordBlur = (event) =>{
    setPassword(event.target.value)
  }
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    if(! /(?=.*[!#$%&? "])/.test(password)){
      setError('password should be atleat one special characters !');
      return;
    }
    setValidated(true);
      setError('');
    createUserWithEmailAndPassword(auth, email, password)
    .then(result=>{
      const user = result.user;
      console.log(user);
    })
    .catch(error=>{
      console.error(error)
    })
    event.preventDefault();
    // console.log(event.target.value)
  }
  return (
    <div>
      <div className="registration w-50 mx-auto mt-3">
      <h3 className='text-primary'>Please register!!</h3>
    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onBlur={handleEmailBlur} type="email" required    placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
        <Form.Control.Feedback type="invalid">
            Please provide a valid email.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onBlur={handlePasswordBlur} type="password"  required  placeholder="Password" />
        <Form.Control.Feedback type="invalid">
            Please provide a valid password.
        </Form.Control.Feedback>
      </Form.Group>
      <p className='text-danger text-xl'>{error}</p>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
      </div>
    </div>
  );
}
export default App;
