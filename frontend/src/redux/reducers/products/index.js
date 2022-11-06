import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    menProducts: [],
    womenProducts: [],
    kidsProducts:[],
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
    setMenProducts: (state, action) => {
      state.menProducts = action.payload;
    },
    setWomenProducts: (state, action) => {
      state.womenProducts = action.payload;
    },
    setKidsProducts: (state, action) =>{
      state.kidsProducts = action.payload
    }
  },
});

export const { setProducts, deleteFromProducts, setMenProducts, setWomenProducts, setKidsProducts } =
  productsSlice.actions;

export default productsSlice.reducer;
