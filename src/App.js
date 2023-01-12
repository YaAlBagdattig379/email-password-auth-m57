import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail} 
from "firebase/auth";
import app from './firebase.init';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmailBlur = (event) =>{
    setEmail(event.target.value)
  }
  const handlePasswordBlur = (event) =>{
    setPassword(event.target.value)
  }
  const handleRegisteredChange = (event) =>{
      // console.log(event.target.checked)
      setRegistered(event.target.checked)
  }
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    if(! /(?=.*[!#$%&? "])/.test(password)){
      setError('password should be at least one special characters !');
      return;
    }
    setValidated(true);
      setError('');
      if(registered){
        signInWithEmailAndPassword(auth, email, password)
        .then(result=>{
          const user = result.user;
          setEmail(user);
          console.log(user)
        })
        .catch(error=>{
          setError(error.message)
          console.log(error)
        })

      }else{
        createUserWithEmailAndPassword(auth, email, password)
        .then(result=>{
          const user = result.user;
          setEmail(' ');
          setPassword(' ');
          emailVerification();
          console.log(user)
        })
        .catch(error =>{
          setError(error.message)
          console.error(error)
        })
      }
    event.preventDefault();
    // console.log(event.target.value)
  }
  const handleResetPassword = () =>{
    sendPasswordResetEmail(auth, email) 
    .then(() => {
      console.log('reset password a user !')
    })
  }
  const emailVerification = () =>{
    sendEmailVerification(auth.currentUser)
    .then(() => {
      console.log('Email Verification Send ....')
      // Email verification sent!
    });
  }
  return (
    <div>
      <div className="registration w-50 mx-auto mt-3">
      <h3 className='text-primary'>Please {registered? 'Login':'Registered'}!!</h3>
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
      <Form.Group className="mb-3" style={{'cursor':'pointer'}} controlId="formBasicCheckbox">
        <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already Registered?" />
      </Form.Group>
      <p className='text-danger text-xl'>{error}</p>
      <Button onClick={handleResetPassword} variant="link">Forget password ?</Button>{' '} <br />
      <Button variant="primary" type="submit">
        {registered ? 'Login' : 'Registered'}
      </Button>
    </Form>
      </div>
    </div>
  );
}
export default App;
