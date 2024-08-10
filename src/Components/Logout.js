import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Redux/slices/authSlice';  // Adjust the import path as necessary

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());  // Dispatch the logout action
        navigate('/login', { replace: true });  // Redirect to the login page
    };

    return <button onClick={handleLogout} style={{backgroundColor:"red", marginLeft:"20px", borderRadius:"6px",border:"none",width:"120px",height:"38px"}}>Logout</button>;
};

export default LogoutButton;

