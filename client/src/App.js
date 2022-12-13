import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Homepage from "./pages/homepage"
import Register from "./pages/register"
// import Login from "./pages/login"
import Loginpage from "./pages/loginpage"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <ToastContainer position='top-center'/>
      <Routes>

        {/* <Route exact path="/" element={<Login />}></Route> */}
        <Route exact path="/" element={<Loginpage />}></Route>
        <Route path="/home" element={<Homepage />}></Route>
        <Route path="/register" element={<Register/>}></Route>
  
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
