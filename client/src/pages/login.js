import React, { useState } from 'react'
import axios from "axios";
import "./login.css";
import {Link, useNavigate} from "react-router-dom"; 


function Login(){
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [loginStatus, setLoginStatus]= useState("");  // for check the status of Login
    const navigate = useNavigate();

    const login = () => {
        axios.post("http://localhost:5000/api/login",{
            email:email,
            password:password,
        })
        .then((response)=>{
            if(response.data.message){
                setLoginStatus(response.data.message)} // Get loginstatus message from Backend
            else{
                console.log(response.data[0].name); 
                // setLoginStatus("Successfully login")
                setTimeout(()=>{
                    navigate('/home');
                }, 500);
            }
        }); 
        
    };
    
    return (

        <div className="login">
            <h1>Login</h1>
            <div>
            <input type="text" name="email" onChange={(e)=>{setEmail(e.target.value);}} placeholder="Enter your Email"></input>
            </div>
            <div>
            <input type="password" name="password" onChange={(e)=>{setPassword(e.target.value);}}  placeholder="Enter your Password" ></input>
            <div><button className='btn' onClick={login}>Login</button></div>
            {/* <div className='btn' onClick={login}>Login</div> */}
            </div>
            <h3>{loginStatus}</h3>
            <Link to="/register">
                <button className='btn'>Register</button>
            </Link>
        </div>
    )

}

export default Login;