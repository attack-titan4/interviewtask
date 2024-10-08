import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import ProductPage from './Pages/ProductPage'; 
import ProductForm from './Components/Product/ProductForm'; // To add/update products

const App = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/home" /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={token ? <Navigate to="/home" /> : <LoginPage />} />
          <Route
            path="/home"
            element={token ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/products"
            element={token ? <ProductPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/product/new"
            element={token ? <ProductForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/product/edit/:id"
            element={token ? <ProductForm /> : <Navigate to="/login" />}
          />
       
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
