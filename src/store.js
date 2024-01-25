import { configureStore } from '@reduxjs/toolkit'
import productReducer from './AdminPages/Products/productSlice'
import categoryReducer from './AdminPages/Products/categorySlice'

export default configureStore({
  reducer: {
    products: productReducer,
    category: categoryReducer
  }
})