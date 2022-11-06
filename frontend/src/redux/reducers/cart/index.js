import { createSlice } from "@reduxjs/toolkit";
console.log("yazeed");
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    deleteFromCart: (state, action) => {
      state.cart = state.cart.filter((product) => {
        return product.id !== action.payload;
      });
    },
  },
});

export const { setCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;
