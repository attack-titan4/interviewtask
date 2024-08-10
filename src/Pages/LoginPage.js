import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Redux/slices/authSlice'; 
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, status, error: reduxError } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log('Attempting login with:', username, password);

    try {
        const action = await dispatch(login({ username, password }));
        if (login.fulfilled.match(action)) {
          
            navigate('/home');
            
         
            startLogoutTimer();
        } else {
          
            setError(action.payload || 'Login failed');
        }
    } catch (err) {
        console.error('Login failed:', err);
        setError('Login failed: ' + (err.message || 'An unknown error occurred'));
    }
};


const startLogoutTimer = () => {
   
    clearTimeout(window.logoutTimer);
   
    window.logoutTimer = setTimeout(() => {
      
        dispatch(logout()); 
        navigate('/login');
    }, 30 * 60 * 1000); 
};


useEffect(() => {
    if (token) {
        navigate('/home');
        startLogoutTimer(); 
    }
}, [token, navigate]);


useEffect(() => {
    return () => clearTimeout(window.logoutTimer);
}, []);

const logout = () => {

  localStorage.removeItem('token');  
  dispatch({ type: 'LOGOUT' });      

  
  navigate('/login');
};


  return (
    <div style={{
      marginLeft: '40%',
      marginTop: '40px',
      width: '20%'
    }}>
      <h2>Login Page</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </Button>
      </Form>

      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
};

export default LoginPage;
