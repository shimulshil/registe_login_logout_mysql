import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
// import Home from "./pages/Home";
import Add from "./pages/Add";
// import View from "./pages/View";
// import Edit from "./pages/Update";
import Homepage from "./pages/homepage";
import Login from "./pages/login";
// import Register from "./pages/register";
import { useEffect, useState } from 'react';

function App() {
  const [ user, setLoginUser] = useState({})

  useEffect(() => {
    setLoginUser(JSON.parse(localStorage.getItem("MyUser")))
  }, [])

  const updateUser = (user) => {
    localStorage.setItem("MyUser", JSON.stringify(user))
    setLoginUser(user)
  }
  return (
    <BrowserRouter>
    <div className="App">
      <ToastContainer position='top-center'/>
      <Routes>
        <Route exact path="/" element={user && user.id ? <Homepage updateUser={updateUser} /> : <Login updateUser={updateUser}/>}></Route>
        <Route path="/login" element={<Login updateUser={updateUser}/>}></Route>
        <Route path="/register" element={<Add/>}></Route>

        
        {/* <Route exact path="/" element={<Home />}></Route>
        <Route path="/addContact" element={<Add />}></Route>
        <Route path="/update/:id" element={<Edit/>}></Route>
        <Route path="/view/:id" element={<View/>}></Route>
         */}
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
