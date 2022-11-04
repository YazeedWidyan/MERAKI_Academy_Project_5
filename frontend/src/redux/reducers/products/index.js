import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    deleteFromProducts: (state, action) => {
      state.products = state.products.filter((product) => {
        return product.id !== action.payload;
      });
    },
  },
});

export const { setProducts, deleteFromProducts } = productsSlice.actions;

export default productsSlice.reducer;
