import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/CartSlice'

export default configureStore({
  reducer: {
    cart : cartReducer
  }


})