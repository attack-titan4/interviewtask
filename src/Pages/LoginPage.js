import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Redux/slices/authSlice'; // Ensure this path is correct
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
            // Login successful, navigate to home
            navigate('/home');
            
            // Start the logout timer
            startLogoutTimer();
        } else {
            // Login failed
            setError(action.payload || 'Login failed');
        }
    } catch (err) {
        console.error('Login failed:', err);
        setError('Login failed: ' + (err.message || 'An unknown error occurred'));
    }
};

// Function to start the 30-minute logout timer
const startLogoutTimer = () => {
    // Clear any existing timers
    clearTimeout(window.logoutTimer);
    
    // Set a new timer for 30 minutes
    window.logoutTimer = setTimeout(() => {
        // Clear token and navigate to login page
        dispatch(logout()); // Ensure this action clears the token
        navigate('/login');
    }, 30 * 60 * 1000); // 30 minutes in milliseconds
};

// Redirect if already logged in
useEffect(() => {
    if (token) {
        navigate('/home');
        startLogoutTimer(); // Start the timer if already logged in
    }
}, [token, navigate]);

// Clear timer on component unmount
useEffect(() => {
    return () => clearTimeout(window.logoutTimer);
}, []);

const logout = () => {
  // Clear the token (this can be done by clearing localStorage or your Redux state)
  // For example:
  localStorage.removeItem('token');  // if you're using localStorage
  dispatch({ type: 'LOGOUT' });      // if you need to dispatch a Redux action

  // Navigate back to the login page
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
