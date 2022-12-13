import React, {useState} from 'react';
import {useNavigate, Link} from "react-router-dom";
import "./login.css";
import axios from "axios";
import {toast} from "react-toastify";

const initialState = {
    email: "",
    password: "",
};

const Loginpage = () => {
    const [user, setUser] = useState(initialState);
    const [loginStatus, setLoginStatus]= useState("");

    const { email, password}= user;

    const navigate = useNavigate();
    
    const handleSubmit =(e)=>{
        e.preventDefault();
        if(!email || !password){
            toast.error ("please provide value into Email & Password field");
            } else{
                axios.post("http://localhost:5000/api/login",{
                     email:email,
                    password:password,
                })
                .then((response)=>{
                    if(response.data.message){
                        setLoginStatus(response.data.message)
                        // alert("Email & Password Not match");
                    }
                        
                    else{
                        console.log(response.data[0].name);
                        alert("Login Successfull");
                        localStorage.setItem('token', response.data[0].token);
                        // console.log(response.data.token);
                setTimeout(()=>{
                    // navigate('/home');
                    navigate("/home", { state: response.data[0].name })
                }, 500);
                    }
                })
            }
    };

    const handleInputChange =(e)=>{
        const { name, value} =e.target;
        setUser({...user, [name]: value});
    };
    return (
    <div className="login" style={{marginTop: "50px"}}>
        {console.log("User", user)}
        <form className='form'
        onSubmit={handleSubmit}
        >
            <h1>Login</h1>
            {/* <label htmlFor= "name">Email</label> */}
            <input type="text" id="email" name="email"placeholder="Your email....." value={email} onChange = {handleInputChange}/>
            {/* <label htmlFor= "password">Password</label> */}
            <input type="password" id="password" name="password" placeholder="Your password....." value={password} onChange = {handleInputChange}/>
            <input className='btn' type="submit" value="Login"/>
            {/* <Link to ="/register">
                <input className='btn' type="button" value="Register"/>
            </Link> */}
            <Link to="/register">
                <button className='btn'>Register</button>
            </Link>
            <h3>{loginStatus}</h3>
        </form>
    </div>
  )
}

export default Loginpage;