import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, updateProduct, deleteProduct } from '../../Redux/slices/productSlice'; 

const ProductForm = ({ productId }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const productStatus = useSelector((state) => state.products.status);
  const [product, setProduct] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((p) => p.id === productId);
      setProduct(foundProduct || {});
    }
  }, [products, productId]);

  const handleUpdate = () => {
    if (editTitle.trim()) {
      fetch(`https://dummyjson.com/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Product updated successfully:', data);
      
        dispatch(updateProduct({ id: productId, product: data }));
       
        setProduct(data);
      })
      .catch(error => console.error('Error updating product:', error));
    } else {
      alert('Please enter a title.');
    }
  };
  const handleDelete = () => {
    if (product) {
      dispatch(deleteProduct(productId))
        .then(() => alert('Product deleted successfully'))
        .catch((err) => console.error('Failed to delete product:', err));
    }
  };

  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <h2>Product Form</h2>
      <div>{productId}</div>
      <form>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={product.title || ''}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
          />
        </div>

        <button type="button" onClick={handleUpdate}>Update Product</button>
        <button type="button" onClick={handleDelete}>Delete Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
