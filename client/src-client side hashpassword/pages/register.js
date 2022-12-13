import React, {useState} from 'react';
import {useNavigate, Link} from "react-router-dom";
import "./register.css";
import axios from "axios";
import {toast} from "react-toastify";
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

const initialState = {
    name: "",
    email: "",
    password: "",
    // reEnterpassword: "",
};

const Register = () => {
    const [user, setUser] = useState(initialState);

    const { name, email, password, reEnterpassword}= user;
    // const [loginStatus, setLoginStatus]= useState("");

    const navigate = useNavigate();
    
    const handleSubmit =(e)=>{
        e.preventDefault();

        if(!name || !email || !password || !reEnterpassword)
            toast.error ("please provide value into each input field");
            
            else if (password !== reEnterpassword) 
            toast.error ("please provide same password");
            
            else{
                const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u')
                // const hashedPassword = bcrypt.hashSync(password)
                console.log(hashedPassword);
                axios.post("http://localhost:5000/api/register", {
                    name: name,
                    email: email,
                    password: hashedPassword,
                })
                .then((response)=>{
                    if(response.data.message){
                        if(response.data.message==="1"){
                            alert("User name & email exist");
                            setTimeout(()=>{
                                navigate('/register');
                            }, 500);
                        }
                        else{
                            alert("User added successfully");
                            setTimeout(()=>{
                                navigate('/');
                            }, 500);
                        }
                    }
                 }
                )
            }
    };

    const handleInputChange =(e)=>{
        const { name, value} =e.target;
        setUser({...user, [name]: value});
    };
    
    return (
        <div className="register">
            {console.log("User", user)}
            <h1>Register</h1>
            <input type="text" name="name" value={name} placeholder="Your Name" onChange={ handleInputChange }></input>
            <input type="text" name="email" value={email} placeholder="Your Email" onChange={ handleInputChange }></input>
            <input type="password" name="password" value={password} placeholder="Your Password" onChange={ handleInputChange }></input>
            <input type="password" name="reEnterpassword" value={reEnterpassword} placeholder="Re-enter Password" onChange={ handleInputChange }></input>
            <div className="button" onClick={handleSubmit} >Register</div>
            
            <Link to="/">
                <button className='btn btn-edit'>Login</button>
            </Link>
            {/* <div><h1>{loginStatus}</h1></div> */}
        </div>
    
  )
}

export default Register;