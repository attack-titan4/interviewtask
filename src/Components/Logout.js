import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Redux/slices/authSlice';  

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());  
        navigate('/login', { replace: true });  
    };

    return <button onClick={handleLogout} style={{backgroundColor:"red", marginLeft:"20px", borderRadius:"6px",border:"none",width:"120px",height:"38px"}}>Logout</button>;
};

export default LogoutButton;

