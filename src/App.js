import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from './firebase.init';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const handleEmailBlur = (event) =>{
    setEmail(event.target.value)
  }
  const handlePasswordBlur = (event) =>{
    setPassword(event.target.value)
  }
  const handleFormSubmit = (event) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(result=>{
      const user = result.user;
      console.log(user);
    })
    .catch(error=>{
      // const errorCode = error.errorCode;
      console.error(error)
    })
    // console.log('form submitted !',email,password)
    event.preventDefault();
    // console.log(event.target.value)
  }
  return (
    <div>
      <div className="registration w-50 mx-auto mt-3">
      <h3 className='text-primary'>Please register!!</h3>
    <Form onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" />
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
