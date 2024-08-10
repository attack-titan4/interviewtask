import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, updateProduct, deleteProduct, addProduct } from '../Redux/slices/productSlice';
import { Table, Button, Form } from 'react-bootstrap';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const productStatus = useSelector((state) => state.products.status);
  const [productToEdit, setProductToEdit] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [newProductTitle, setNewProductTitle] = useState('');

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  const handleUpdate = (id) => {
    dispatch(updateProduct({ id, product: { title: editTitle } }))
      .unwrap()
      .then(() => {
        setProductToEdit(null);
        setEditTitle('');
      })
      .catch(error => console.error('Error updating product:', error));
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
      .unwrap()
      .then(() => console.log('Product deleted successfully'))
      .catch(error => console.error('Error deleting product:', error));
  };

  const handleEditClick = (product) => {
    setProductToEdit(product.id);
    setEditTitle(product.title);
  };

  const handleAddProduct = () => {
    if (newProductTitle.trim()) {
      const newProduct = { title: newProductTitle };
      dispatch(addProduct(newProduct))
        .unwrap()
        .then(() => {
          setNewProductTitle(''); // Clear input field after successful addition
        })
        .catch(error => console.error('Error adding product:', error));
    } else {
      alert('Product title cannot be empty'); // Alert if input is empty
    }
  };

  if (productStatus === 'loading') return <p>Loading products...</p>;
  if (productStatus === 'failed') return <p>Error loading products.</p>;

  return (
    <div>
      
      
      <div style={{ margin: '15px' }}>
        <h3>Add New Product</h3>
        <Form>
          <Form.Group controlId="formProductTitle">
            <Form.Label>Product Title</Form.Label>
            <Form.Control
              type="text"
              value={newProductTitle}
              onChange={(e) => setNewProductTitle(e.target.value)}
              placeholder="Enter product title"
            />
          </Form.Group>
          <Button variant="primary" onClick={handleAddProduct} className="mt-2">
            Add Product
          </Button>
        </Form>
      </div>

      <h2 style={{ marginLeft: '15px', marginTop: '20px' }}>Product List</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>
                <strong>{product.title}</strong>
              </td>
              <td>
                <Button variant="warning" onClick={() => handleEditClick(product)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(product.id)} className="ms-2">Delete</Button>
              </td>
              <td>
                {productToEdit === product.id && (
                  <div>
                    <Form.Control
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="mb-2"
                    />
                    <Button variant="success" onClick={() => handleUpdate(product.id)}>Save</Button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductList;
