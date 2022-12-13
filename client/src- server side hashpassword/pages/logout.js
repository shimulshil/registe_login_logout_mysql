import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Logout() {

    const navigate = useNavigate();

    // HANDLE LOGOUT EVENT
    const logout = (e) => {
        e.preventDefault();
        console.log('Logout');

        // CLEAR DATA FROM STORAGE
        localStorage.clear();
        sessionStorage.clear();

        navigate("/");
    }

    return (
        <nav cclassName="button">
            <Link to="#" 
              onClick={logout}
			>
             Logout
			</Link>

            {/* <Link to="/register">
                <button className='btn'>Logout</button>
            </Link> */}
        </nav>
    )
}

export default Logout;