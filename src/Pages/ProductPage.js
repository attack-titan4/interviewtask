import React from "react";
import ProductList from "../Components/ProductList";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductPage = () => {
  return (
    <div>
      <div style={{display:"flex", flexDirection:"row", gap:"30%"}}>
        <Button style={{height:"40px"}}> <Link to="/home" style={{color:'white', textDecoration:"none"}}>Go Back</Link></Button>
        <h1>Product Management </h1>
      </div>
      <ProductList />
    </div>
  );
};

export default ProductPage;
