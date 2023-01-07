import './App.css';
import { getAuth } from "firebase/auth";
import app from './firebase.init';

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
    <div className="App">
       <form onSubmit={formSubmit}>
          {/* <input onChange={handleEmailChange} type="email" name="" id="" /> */}
          <input onBlur={handleEmailBlur} type="email" name="" id="" />
          <br />
          <input onChange={handlePasswordChange} type="password" name="" id="" />
          <br />
          <input type="submit" value="" placeholder='submit' />
       </form>
    </div>
  );
}

export default App;
