import { createSlice, createAsyncThunk,} from '@reduxjs/toolkit';
import axios from 'axios';
import { getTokenFromCookies } from '../cookieUtils';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { getState }) => {
  const jwt = getTokenFromCookies();
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
  const response = await axios.get('https://backend.gsports.in:443/api/product/products',{
    headers : {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
});

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    value: [],
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
