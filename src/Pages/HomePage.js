import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../Components/Logout';
import { Button } from 'react-bootstrap';

const HomePage = () => {
  return (
    <div style={{
      marginLeft: '40%',
      marginTop: '40px',
      width: '20%'
    }}>
      <h1 style={{marginLeft:"20px"}}>Welcome</h1>
      <p>Please choose an option below:</p>
      <div>
        <Button variant="primary">
          <Link to="/products" style={{color:'black', textDecoration:"none"}}>View Products</Link>
        </Button>
        <LogoutButton/>
      </div>
    </div>
  );
};

export default HomePage;
