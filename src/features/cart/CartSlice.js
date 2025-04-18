// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload.products
      state.totalQuantity = action.payload.products.reduce((acc, item) => acc + item.quantity, 0)
      state.totalPrice = action.payload.totalPrice
    },
    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalPrice = 0
    }
  }
})

export const { setCartItems, clearCart } = cartSlice.actions
export default cartSlice.reducer
