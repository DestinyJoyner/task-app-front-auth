import React from 'react';
import { Link } from 'react-router-dom'

const NavBar = ({ user, setUser, setToken }) => {

    const handleLogout = () => {
        setUser(null)
        setToken(null)
    }

    return (
        <nav>
            <Link to ="/">Task Manager</Link>
        {
            !user ?
            <>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link> 
            </>
            :
            <>
            <Link to="/tasks">{user.username}</Link>
            <button onClick={handleLogout}>Log Out</button>
            </>
            
        }
        </nav>
    );
};

export default NavBar;