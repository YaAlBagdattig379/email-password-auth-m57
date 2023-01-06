import './App.css';
import { getAuth } from "firebase/auth";
import app from './firebase.init';

const auth = getAuth(app);

function App() {
  const handleEmailChange = (event) =>{
    console.log('something are writtenffffffffffff by me..')
  }
  return (
    <div className="App">
       <form>

          <input onChange={handleEmailChange} type="email" /> <br />
          <input type="password" />
       </form>
    </div>
  );
}

export default App;
