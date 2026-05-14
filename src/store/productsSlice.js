import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/products';


export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.message;
    }
});

export const addProduct = createAsyncThunk('products/addProduct', async (newProduct) => {
    try {
        const response = await axios.post(BASE_URL, newProduct);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.message;
    }
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (product) => {
    try {
        const response = await axios.put(`${BASE_URL}/${product.id}`, product);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.message;
    }
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
        return id;
    } catch (error) {
        throw error.response?.data?.message || error.message;
    }
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter(p => p.id !== action.payload);
            });
    }
});

export default productsSlice.reducer;
