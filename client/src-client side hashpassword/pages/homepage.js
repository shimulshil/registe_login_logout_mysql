import React, { useEffect } from "react"
import "./homepage.css"
import { useNavigate, useLocation } from 'react-router-dom';

const Homepage = () => {
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(!localStorage.getItem('token')){ // After login, A token is created, if get token then go to login page
            navigate('/')
        }
    },[navigate])

    let location = useLocation();
    console.log(location.state);

    const logout = (e) => {
        e.preventDefault();
        console.log('Logout');

        // CLEAR DATA FROM STORAGE
        localStorage.clear();
        sessionStorage.clear();

        navigate("/");
    }

    return (
        <div className="homepage">
            <h1>Homepage</h1>
            <h2>Hello {location.state}</h2>
            <div className='button' onClick={logout}>Logout</div>
        </div>
    )
}

export default Homepage