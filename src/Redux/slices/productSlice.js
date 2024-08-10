import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';


const initialState = {
  products: [],
  status: 'idle',
  error: null,
};


export const fetchProducts = createAsyncThunk('/products', async () => {
  const response = await axiosInstance.get('/products'); 
  return response.data.products || []; 
});


export const addProduct = createAsyncThunk('products/addProduct', async (product) => {
  const response = await fetch('https://dummyjson.com/products/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  return response.json(); 
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, product }) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  return response.json(); 
});


export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  await axiosInstance.delete(`/products/${id}`); 
  return id; 
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
